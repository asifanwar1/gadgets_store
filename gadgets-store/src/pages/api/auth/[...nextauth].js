import NextAuth from "next-auth"
import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                identifier: {
                    label: "Email",
                    type: "text",
                    placeholder: "Enter email",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Enter Password",
                },
            },

            async authorize(credentials, req) {
                const { identifier, password } = credentials
                const res = await axios.post(`${process.env.API_URL}/api/auth/local`, {
                    identifier: identifier,
                    password: password,
                  });
                  
                  
                  const user = res.data.user;
                  const token = res.data.jwt;
                  console.log("token: ", token)
                if (res.status === 200 && user) {
                    // Make another request to get the user's role
                    const roleResponse = await axios.get(`${process.env.API_URL}/api/users/me?populate=role`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    const role = roleResponse.data.role;
                    user.jwtoken = token;
                    user.role = role.type;
                    // console.log(user)
                    return user;
                } else return null;
            },
        }),
        // ...add more providers here
    ],
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            session.user = token;
            return session;
        },
    },
    pages: {
        // signIn: '/auth/signin',
        signIn: '/Login',
    }
}
export default NextAuth(authOptions)
