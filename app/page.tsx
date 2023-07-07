import { ProjectInterface } from "@/common.types";
import Categories from "@/components/Categories";
import LoadMore from "@/components/LoadMore";
import ProjectCard from "@/components/ProjectCard";
import { fetchAllProjects } from "@/lib/actions"

type ProjectSearch = {
  projectSearch: {
    edges: {node: ProjectInterface}[],
  pageInfo: {
    hasNextPage: boolean,
    hasPreviousPage: boolean,
    startCursor: string,
    endCursor: string
  }
  }
}



type SearchParams = {
  category?: string ;
  endCursor?: string ;
}

type Props = {
  searchParams: SearchParams
}


export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

async function Home({searchParams: {category,endCursor}} : Props) {
  const data = await fetchAllProjects(category ,endCursor) as ProjectSearch;

  const projectsToDisplay = data?.projectSearch?.edges || [];

  return (
    <section className="flex-start flex-col paddings mb-16">
      <Categories />
      <section className='projects-grid'>
        {
	projectsToDisplay.length !== 0 ? 
	projectsToDisplay.map(({node}:{node: ProjectInterface})=>(
          <ProjectCard 
            key={node?.id}
            id={node?.id}
            image={node?.image}
            title={node?.title}
            name={node?.createdBy.name}
            avatarUrl={node?.createdBy.avatarUrl}
            userId={node?.createdBy.id}
          />
        )) : 
	<section className='flexCenter w-full flex-col paddings'>
        <p className="no-result-text w-full text-center">
          No projects found.
        </p>
      </section>
}
      </section>
      <LoadMore 
        startCursor={data?.projectSearch?.pageInfo?.startCursor} 
        endCursor={data?.projectSearch?.pageInfo?.endCursor} 
        hasPreviousPage={data?.projectSearch?.pageInfo?.hasPreviousPage} 
        hasNextPage={data?.projectSearch?.pageInfo.hasNextPage}
      />
 
    </section>
  )
}

export default Home