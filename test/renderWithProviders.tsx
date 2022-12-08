import React from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import reducer from "../src/app/notesSlice";

export function renderWithProviders(
	ui: JSX.Element,
	{
		store = configureStore({
			reducer,
		}),
	} = {},
) {
	function Wrapper({ children }: React.PropsWithChildren) {
		return <Provider store={store}>{children}</Provider>;
	}

	return { store, ...render(ui, { wrapper: Wrapper }) };
}
