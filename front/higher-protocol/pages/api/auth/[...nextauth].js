import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"


export default NextAuth({
	providers: [
		CredentialsProvider({
			// The name to display on the sign in form (e.g. 'Sign in with...')
			name: 'Credentials',
			credentials: {
				username: {label: "Username", type: "text", placeholder: "jsmith"},
				password: {label: "Password", type: "password"},
			},
			session: {
				jwt: true,
				maxAge: 30 * 24 * 60 * 60
			},
			async authorize(credentials, req) {
				const credBody = {
					user: {
						email: credentials.username,
						password: credentials.password
					}
				}

				const res = await fetch("https://hr-app-eth.herokuapp.com/login", {
					method: 'POST',
					body: JSON.stringify(credBody),
					headers: {"Content-Type": "application/json"}
				})

				const user = await res.json()
				user.token = res.headers.get('authorization')

				// If no error and we have user data, return it
				if (res.ok && user) {
					return user
				}
				// Return null if user data could not be retrieved
				return null
			}
		})
	],
	callbacks: {
		async session({ session, token, user }) {
			session.user = {...token.token.user}
			return session
		},
		async jwt(token, user) {
			if (typeof user !== typeof undefined){
				token.user = user;
			}
			if (!token){
				console.log('no token. get out')
			}
			return token;
		}
	},
	pages: {
		signIn: '/auth/signin'
	},
	secret: '5odm2voT1BdJevGjDgXYX6006Mo6xrDTnc1fxVsAlgU='
})