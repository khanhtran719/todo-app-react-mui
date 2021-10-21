import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Box from "@mui/material/Box";

import Controller from "./components/Controller";
import Home from "./pages/Home";
import TimeLine from "./pages/TimeLine";
import AboutMe from "./pages/AboutMe";
import NotFound from "./pages/NotFound";

import { MyContextProvider } from "./contexts/MyContext";
import useWindowDimensions from "./utils/windowDimensions";

const App = () => {
    const { width } = useWindowDimensions();
    return (
        <MyContextProvider>
            <BrowserRouter>
                <Box display="flex" justifyContent="space-between">
                    <Box width="300px">
                        <Controller />
                    </Box>
                    <Box sx={{ width: width - 300 }}>
                        <Switch>
                            <Route path="/" exact component={Home}/>
                            <Route path="/timeline" component={TimeLine}/>
                            <Route path="/about-me" component={AboutMe} />
                            <Route path="*" component={NotFound} />
                        </Switch>
                    </Box>
                </Box>
            </BrowserRouter>
        </MyContextProvider>
    );

}
export default App;
