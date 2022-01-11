import {getSession, getCsrfToken} from "next-auth/react"
import {Button, ButtonGroup} from "react-bootstrap";
import Link from "next/link";
import Head from "next/head";

export default function SignIn({csrfToken}) {
	return (
			<div id="login-page">
				<div id="login-page_form">
					<div className="logo"/>
					<div id="description">
						<p>A high volume recruitment platform based on BLOCKCHAIN</p>
						<p className="helper-text">Welcome back! Please login to your account.</p>
					</div>
					<form method="post"
					      action="/api/auth/callback/credentials"
					      id="login-form"
					      className="shadow-none">
						<ButtonGroup id="login-options">
							<Button variant="secondary" className="shadow-none">Candidate</Button>
							<Button variant="secondary" className="shadow-none selected">Company</Button>
							<Button variant="secondary" className="shadow-none">Validator</Button>
						</ButtonGroup>

						<div className="login-input">
							<input name="csrfToken" type="hidden" defaultValue={csrfToken} />
							<span>
								<label htmlFor="login" className="helper-text">Email Address</label>
								<input type="email" name="username" className="form-control shadow-none" id="login" placeholder="ion.creanga@humulesti.ro"/>
							</span>
							<span>
								<label htmlFor="password" className="helper-text">Password</label>
								<input type="password" name="password" className="form-control shadow-none" id="password" placeholder="*****"/>
							</span>
						</div>

						<div className="login-help">
							<span>
								<input type="checkbox" id="rememberMe"/>
								<label htmlFor="rememberMe" className="helper-text noselect">Remember me</label>
							</span>
							<Link href="/#" className="helper-text"><a>Forgot password?</a></Link>
						</div>

						<div className="login-buttons">
							<Button type="submit"
							        id="login-btn"
							        variant="primary"
							        className="shadow-none">
								Login
							</Button>
							<Button  id="signup" variant="primary" className="shadow-none">Sign	Up</Button>
						</div>
					</form>

					<div className="alternative-login">
						<p className="helper-text">Or login with</p>
						<Button className="btn-google"/>
						<Button className="btn-linkedin"/>
						<Button className="btn-facebook"/>
					</div>

				</div>
				<div className="login_image"/>
			</div>

	)
}

SignIn.getLayout = page => (
	<>
		<Head>
			<title>Higher Protocol</title>
		</Head>
		{page}
	</>
)

export async function getServerSideProps(context) {
	const session = await getSession(context)
	const csrfToken = await getCsrfToken(context)

	if (session) {
		return {
			redirect: {destination: "/"},
		};
	}

	return {
		props: {
			csrfToken,
			session
		},
	}
}

