import React, { useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@chakra-ui/react'
import isHotkey from 'is-hotkey'
import { Editable, withReact, Slate } from 'slate-react'
import { createEditor } from 'slate'
import { withHistory } from 'slate-history'

import EditorToolbar from './toolbar'
import Element from './Element'
import Leaf from './Leaf'
import { toggleMark } from './utils'
import { withImages, withLinks } from './plugins'
import { DEFAULT_EDITOR_VALUE, PLACEHOLDER_TEXT, NODE_TYPES } from './constants'

const HOTKEYS = {
    'mod+b': NODE_TYPES.BOLD,
    'mod+i': NODE_TYPES.ITALIC,
    'mod+u': NODE_TYPES.UNDERLINED,
    'mod+`': NODE_TYPES.CODE,
}

export default function Editor({
    initialValue,
    onChange: handleParentChange,
    imageUploadHandler,
}) {
    const [value, setValue] = useState(initialValue || DEFAULT_EDITOR_VALUE)
    const handleChange = useCallback(
        value => {
            setValue(value)
            handleParentChange(value)
        },
        [handleParentChange],
    )
    const editor = useMemo(
        () => withLinks(withImages(withHistory(withReact(createEditor())))),
        [],
    )

    return (
        <Box
            sx={{
                border: '1px',
                borderColor: 'border',
                borderRadius: '2px',
                height: 'full',
            }}>
            <Slate editor={editor} value={value} onChange={handleChange}>
                <EditorToolbar imageUploadHandler={imageUploadHandler} />
                <Box
                    sx={{
                        padding: 3,
                        maxHeight: '60vh',
                        overflowY: 'auto',
                        overflowX: 'hidden',
                    }}>
                    <Editable
                        renderElement={Element}
                        renderLeaf={Leaf}
                        placeholder={PLACEHOLDER_TEXT}
                        spellCheck
                        autoFocus
                        onKeyDown={event => {
                            for (const hotkey in HOTKEYS) {
                                if (isHotkey(hotkey, event)) {
                                    event.preventDefault()
                                    const mark = HOTKEYS[hotkey]
                                    toggleMark(editor, mark)
                                }
                            }
                        }}
                    />
                </Box>
            </Slate>
        </Box>
    )
}

Editor.propTypes = {
    initialValue: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    imageUploadHandler: PropTypes.func.isRequired,
}
