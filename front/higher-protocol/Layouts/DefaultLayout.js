// libs
import Head from "next/head";
import {SessionProvider} from "next-auth/react";

// custom
import Layout from "./Layout";


const DefaultLayout = (page) => (
	<>
		<Head>
			<title>Higher Protocol</title>
		</Head>
		<SessionProvider session={page.props.session}>
			<Layout>
				{page}
			</Layout>
		</SessionProvider>
	</>
)


export default DefaultLayout;
