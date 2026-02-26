import { BrowserRouter, Routes, Route } from "react-router-dom"
import {Input} from "../views/Input/Input"
import { Error } from "../views/Error/Error"
import { History } from "../views/History/History"

export function AppRouter() {
  return (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Input />} />
			<Route path="/Input" element={<Input />} />
			<Route path="/History" element={<History />} />
			<Route path="*" element={<Error status={404} />} />		
		</Routes>
	</BrowserRouter>
  )
}