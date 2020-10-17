import React from 'react'
import { Stack } from '@chakra-ui/core'

import { Heading } from '@/common/ui'

export default function Setup() {
    return (
        <Stack spacing={8}>
            <Heading size="2xl">Welcome 👋</Heading>
            <Heading size="lg">
                Matterwiki is a simple wiki for small teams.
            </Heading>
            <Heading size="md">
                People use it to store documentation, notes, culture guidelines,
                employee onboarding content and everything they want to.
            </Heading>
        </Stack>
    )
}
