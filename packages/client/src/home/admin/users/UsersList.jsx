import React from 'react'
import { useAsync } from 'react-async-hook'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { Center, List } from '@chakra-ui/react'

import { Spinner, CardListItem, ErrorAlert, Heading } from '@/common/ui'
import useUserStore from './user-store'

export default function UsersList() {
    const [userList, getUserList] = useUserStore('userList', 'getList')
    const history = useHistory()
    const { url } = useRouteMatch()
    const { error, loading } = useAsync(getUserList, [])

    if (loading) return <Spinner />
    if (error) {
        return (
            <ErrorAlert
                variant="subtle"
                jsError={new Error('There was an error fetching users.')}
            />
        )
    }
    if (userList.length === 0) {
        return (
            <Center>
                <Heading size="lg">😵 No users found</Heading>
            </Center>
        )
    }

    return (
        <List>
            {userList.map(user => {
                const { id, about, name, isAdmin } = user
                const handleEditClick = () => history.push(`${url}/${id}`)
                const handleDeleteClick = () => {
                    history.push(`${url}/${id}/delete`)
                }

                return (
                    <CardListItem
                        key={id}
                        name={name}
                        badgeText={isAdmin ? 'admin' : ''}
                        about={about}
                        onEditClick={handleEditClick}
                        onDeleteClick={handleDeleteClick}
                    />
                )
            })}
        </List>
    )
}
