import '../styles/index.scss'
import DefaultLayout from "../Layouts/DefaultLayout";

function MyApp({ Component, pageProps }) {
	const getLayout = Component.getLayout || DefaultLayout
	return getLayout(<Component {...pageProps} />)
}

export default MyApp
