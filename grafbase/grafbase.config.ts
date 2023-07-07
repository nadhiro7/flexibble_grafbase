import { g, auth, config } from '@grafbase/sdk'

// @ts-ignore
const User = g.model('User',{
  name: g.string().length({min: 2,max:30}),
  email: g.string().unique(),
  avatarUrl: g.url(),
  description: g.string(),
  githubUrl: g.url().optional(),
  linkedInUrl: g.url().optional(),
  projects: g.relation(()=>Project).list().optional()
}).auth(rules=>{
  rules.public().read()
})
// @ts-ignore
const Project = g.model("Project",{
  title: g.string().length({min: 3}),
  description: g.string(),
  image: g.url(),
  githubUrl: g.url(),
  liveSiteUrl: g.url(),
  category: g.string().search(),
  createdBy: g.relation(()=> User)
}).auth(rules=>{
  rules.public().read()
  rules.private().create().delete().update()
})
const jwt = auth.JWT({
  issuer: 'grafbase',
  secret: g.env('NEXTAUTH_SECRET')
})
export default config({
  schema: g,
  // Integrate Auth
  // https://grafbase.com/docs/auth
  auth: {
    providers: [jwt],
    rules: (rules) => {
      rules.private()
    }
  }
})
