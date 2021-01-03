import React from 'react'
import PropTypes from 'prop-types'
import { useRouteMatch } from 'react-router-dom'
import { Box, Stack } from '@chakra-ui/react'

import { Description, TextWithIcon } from './Text'
import { RouterLink } from './Link'

/**
 * A nav item component that does a little too much!
 * @param {*} props
 */
export default function NavItem({
    icon: Icon,
    name,
    desc,
    highlightActive,
    to,
    ...props
}) {
    const match = useRouteMatch(to)
    const isActive = match !== null

    return (
        <Box
            as={RouterLink}
            {...props}
            to={to}
            sx={{
                backgroundColor:
                    highlightActive && isActive ? 'gray.100' : null,
                color: 'text',
                marginRight: 6,
                marginTop: [4, 4, 0],
                paddingX: 2,
                outline: 'none',
                _focus: { outline: 'none', boxShadow: 'none' },
                _active: { outline: 'none' },
                _hover: {
                    color: 'primary.500',
                    textDecoration: 'none',
                    outline: 'none',
                },
            }}>
            <Stack spacing={1}>
                <TextWithIcon icon={Icon} text={name} />
                {desc ? <Description>{desc}</Description> : null}
            </Stack>
        </Box>
    )
}

NavItem.defaultProps = {
    highlightActive: false,
    desc: null,
}

NavItem.propTypes = {
    icon: PropTypes.elementType.isRequired,
    name: PropTypes.string.isRequired,
    desc: PropTypes.string,
    highlightActive: PropTypes.bool,
    to: PropTypes.string.isRequired,
}
