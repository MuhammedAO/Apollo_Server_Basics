const { ApolloServer, gql } = require('apollo-server')

//schema
const typeDefs = gql`
type Query{
    hello(name:String!): String!
    user: User!
}

type Mutation {
    register(userInfo: UserInfo!): RegisterResponse!
    login(userInfo: UserInfo!): String!
}

input UserInfo {
   username: String!
   password:String!
   age:Int
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

    
`

//it is important to note that you can create a resolver for a single Query or mutation field type

//resolver

const resolvers = {
  User: {
    username: (parent) => {
      console.log(parent);
      return parent.username
    }
  },
  Query: {
    hello: (parent, { name }) => {
      return `Hello my name is ${name}`
    },
    user: () => ({
      id,
      username
    })
  },
  Mutation: {
    login: (parent, { userInfo: { username } }, context, info) => {
      console.log(context)

      return username
    },
    register: () => ({
      errors: [
        {
          field: 'Why are you learning gQL?',
          message: 'bad question'
        },
        {
          field: 'Why are you learning ts?',
          message: 'good question'
        }
      ],
      user: {
        id: 1,
        username: 'Muhammed ogunsanya'
      }
    })
  }
}

//the context is something you have access to across all your resolvers
//it is usually created on each request

const server = new ApolloServer({ typeDefs, resolvers, context: ({ req, res }) => ({ req, res }) })

server.listen().then(({ url }) => console.log(`server started at ${url}`))