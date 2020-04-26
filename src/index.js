const { ApolloServer, gql } = require('apollo-server')

//schema
const typeDefs = gql`
type Query{
    hello: String!
}

type User{
 id: ID!
 username: String!
}

type Error {
  field: String!
  message: String!
}

type RegisterResponse {
  errors:[Error]
  user: User!
}

type Mutation {
    register: RegisterResponse!
}
    
`

//resolver
const resolvers = {
  Query: {
    hello: () => 'graphQL up and running'
  },
  Mutation: {
    register: () => ({
      errors: [{
        field: 'Why are you learning gQL?',
        message:'bad question'
      }],
    user: {
      id: 1,
      username: 'Muhammed ogunsanya'
    }
    })
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => console.log(`server started at ${url}`))