import { ProjectForm } from '@/common.types';
import { createProjectMutation, deleteProjectMutation, getProjectByIdQuery, getProjectsOfUserQuery, getUserQuery, projectsQuery, updateProjectMutation, userCreateMutation } from '@/graphql';
import {GraphQLClient} from 'graphql-request'

const isProduction = process.env.NODE_ENV === "production";

const API_URL = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || '' : 'http://127.0.0.1:4000/graphql';

const API_KEY = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || '' : 'nadhir';

const SERVER_URL = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : "http://localhost:3000"

const client = new GraphQLClient(API_URL)

const makeGraphQlRequest = async (query: string, variables = {})=>{
    try{
        return await client.request(query,variables)
    }catch(error){
        throw error;
    }
}

export const getUser=(email: string)=>{
    client.setHeader('x-api-key',API_KEY)
    return makeGraphQlRequest(getUserQuery,{email})
}
export const createUser=(name: string,email: string,avatarUrl: string)=>{
    client.setHeader('x-api-key',API_KEY)
    const description = ''
    const variables= {
        input: {
            name,email,avatarUrl,description
        }
    }
    return makeGraphQlRequest(userCreateMutation,variables)
}

export const fetchToken= async ()=>{
    try {
        const response = await fetch(`${SERVER_URL}/api/auth/token`)
        return response.json()
    } catch (error) {
        throw error
    }
}

export const uploadImage = async (imagePath: string)=>{
    try {
        const response  = await fetch(`${SERVER_URL}/api/upload`,{method: 'POST',body: JSON.stringify({path: imagePath})})
        return response.json()
    } catch (error) {
        throw error
    }
}

export const createNewProject = async (form: ProjectForm,creatorId: string, token: string ) => {
    const imageUrl = await uploadImage(form.image);
    if(imageUrl.url){
        client.setHeader("Authorization", `Bearer ${token}`)
        const variables = {
            input: {
                ...form,
                image: imageUrl.url,
                createdBy: {
                    link: creatorId
                }
            }
        }
        return makeGraphQlRequest(createProjectMutation,variables)
    }
}
export const fetchAllProjects = (category?: string,endCursor?: string)=>{
    client.setHeader('x-api-key', API_KEY);
    return makeGraphQlRequest(projectsQuery, {category,endCursor})
}

export const getProjectDetails=(id: string)=>{
    client.setHeader('x-api-key',API_KEY)
    return makeGraphQlRequest(getProjectByIdQuery,{id})
}


export const deleteProject = (id: string, token: string) => {
    client.setHeader("Authorization", `Bearer ${token}`);
    return makeGraphQlRequest(deleteProjectMutation, { id });
  };

  export const getUserProjects = (id: string, last?: number) => {
  client.setHeader("x-api-key", API_KEY);
  return makeGraphQlRequest(getProjectsOfUserQuery, { id, last });
};


export const updateProject = async (form: ProjectForm, projectId: string, token: string) => {
    function isBase64DataURL(value: string) {
      const base64Regex = /^data:image\/[a-z]+;base64,/;
      return base64Regex.test(value);
    }
  
    let updatedForm = { ...form };
  
    const isUploadingNewImage = isBase64DataURL(form.image);
  
    if (isUploadingNewImage) {
      const imageUrl = await uploadImage(form.image);
  
      if (imageUrl.url) {
        updatedForm = { ...updatedForm, image: imageUrl.url };
      }
    }
  
    client.setHeader("Authorization", `Bearer ${token}`);
  
    const variables = {
      id: projectId,
      input: updatedForm,
    };
  
    return makeGraphQlRequest(updateProjectMutation, variables);
  };