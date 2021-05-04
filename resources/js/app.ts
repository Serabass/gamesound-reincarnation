var App = (require('@inertiajs/inertia-react')).App;
import { InertiaProgress } from '@inertiajs/progress'

import React from 'react'
import { render } from 'react-dom'

require('./bootstrap');

InertiaProgress.init()
const el = document.getElementById('app')

let component = React.createElement(App, {
    initialPage: JSON.parse(el?.dataset.page as any),
    resolveComponent: (name: any) => require(`./${name}`).default
});

render(
    component,
    el
)
