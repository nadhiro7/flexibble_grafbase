"use client"

import { ProjectInterface, SessionInterface } from "@/common.types"
import Image from "next/image"
import { ChangeEvent, useState } from "react"
import FormField from "./FormField"
import { categoryFilters } from "@/constants"
import CustomMenu from "./CustomMenu"
import { title } from "process"
import Button from "./Button"
import { createNewProject, fetchToken, updateProject } from "@/lib/actions"
import { useRouter } from "next/navigation"

type Props = {
    type: string,
    session: SessionInterface,
    project?: ProjectInterface
}
function ProjectForm({ type, session, project }: Props) {

    const router= useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [form, setForm] = useState({
        image: project?.image || '',
        title: project?.title || '',
        description: project?.description || '',
        liveSiteUrl: project?.liveSiteUrl || '',
        githubUrl: project?.githubUrl || '',
        category: project?.category || ''
    })

    const handleFormSubmit = async (e: React.FormEvent)=>{
        e.preventDefault()

        setIsSubmitting(true);
        const {token} = await fetchToken()
        try {
            if(type === 'create'){
                await createNewProject(form,session?.user?.id, token)
                router.push('/')
            }
            if(type==='edit'){
                await updateProject(form,project?.id as string,token);
                router.push('/')
            }
        } catch (error) {
            console.log(error)
        }finally{
            setIsSubmitting(false)
        }
    }
    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        const file = e.target.files?.[0];
        if(!file) return;
        if(!file.type.includes('image')) return alert('Please upload an image file')
        const reader = new FileReader()
        reader.readAsDataURL(file);
        reader.onload = ()=>{
            const result = reader.result as string;
            handleStateChange("image",result)
        }
    }
    const handleStateChange = async (fieldName :string,value: string)=>{
        setForm(prevState=>({
            ...prevState,
            [fieldName]: value
        }))
    }

    return (
        <form
            onSubmit={handleFormSubmit}
            className="flexStart flex-col w-full gap-4 mt-7 Form"
        >
            <div className="flexStart form_image-container">
                <label htmlFor="image" className="flexStart form_image-label">
                    {!form.image && "choose image for your project"}
                </label>
                <input
                    id="image"
                    type="file"
                    accept="image/*"
                    required={type ==='create'}
                    className="form_image-input"
                    onChange={handleChangeImage}
                />
                {form.image &&
                    <Image src={form?.image} alt={"project poster"} className="object-contain z-20 sm:p-10" fill />
                }
            </div>
            <FormField
                title="Title"
                state={form.title}
                placeholder='flexibble'
                setState={(value)=>handleStateChange('title',value)}
            />
            <FormField
                title="Description"
                state={form.description}
                placeholder='Showcase and discover remakable developer projects.'
                setState={(value)=>handleStateChange('description',value)}
                isTextArea={true}
            />
            <FormField
                type="url"
                title="Website url"
                state={form.liveSiteUrl}
                placeholder='https://www.google.com'
                setState={ (value) => handleStateChange('liveSiteUrl', value)}
            />
            <FormField
                type="url"
                title="Github url"
                state={form.githubUrl}
                placeholder='https://github.com'
                setState={(value)=>handleStateChange('githubUrl',value)}
            />

            <CustomMenu
                title="Category"
                state={form.category}
                filters={categoryFilters}
                setState={(value)=>handleStateChange('category',value)}
            />

            <div className="flexStart mt-7 w-full">
            <Button
                    title={isSubmitting ? `${type === "create" ? "Creating" : "Editing"}` : `${type === "create" ? "Create" : "Edit"}`}
                    type="submit"
                    leftIcon={isSubmitting ? "" : "/plus.svg"}
                    submitting={isSubmitting}
                />
            </div>
        </form>
    )
}

export default ProjectForm