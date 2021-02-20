import React from 'react';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';
import logo_archivo from './images/logos/archivo.png'
import logo_config from './images/logos/config.png'
import logo_info from './images/logos/info.png'
import logo_wi_fi from './images/logos/wi_fi.png'
import Inicio from './pages/Inicio';
import Archivo from './pages/Archivo';
import Config from './pages/Config';
import Info from './pages/Info';
import Wifi from './pages/Wifi';
import InfoGen from './pages/InfoGen';
import Programas from './pages/Programas';
import AgregarProg from './pages/AgregarProg';

function App() {
    const ip = "http://192.168.100.251:3000/";
    return (
        <Router>
            <Link to="/archivo"><img id="archivo_1" src={logo_archivo} alt={logo_archivo} /></Link>
            <Link to="/config"><img id="config_1" src={logo_config} alt={logo_config} /></Link>
            <Link to="/wifi"><img id="wi_fi_1" src={logo_wi_fi} alt={logo_wi_fi} /></Link>
            <Link to="/info"><img id="info_1" src={logo_info} alt={logo_info} /></Link>
            <Switch>
                <Route path="/" exact>
                    <Inicio />
                </Route>
                <Route path="/archivo">
                    <Archivo />
                </Route>
                <Route path="/config">
                    <Config ip={ip} />
                </Route>
                <Route path="/info">
                    <Info ip={ip} />
                </Route>
                <Route path="/info_gen">
                    <InfoGen />
                </Route>
                <Route path="/wifi" >
                    <Wifi ip={ip} />
                </Route>
                <Route path="/programas">
                    <Programas ip={ip} />
                </Route>
                <Route path="/agregar_pro">
                    <AgregarProg ip={ip} />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
