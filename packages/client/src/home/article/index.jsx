import React from 'react'
import { Switch, useRouteMatch } from 'react-router-dom'

import { ProtectedRoute } from '@/common/components'

import NewArticle from './NewArticle'
import ArticleList from './ArticleList'

export default function Articles() {
    const { path } = useRouteMatch()

    return (
        <Switch>
            <ProtectedRoute
                adminOnly
                isExact
                path={`${path}/new`}
                component={NewArticle}
            />
            <ProtectedRoute
                adminOnly
                isExact
                path={path}
                component={ArticleList}
            />
        </Switch>
    )
}