import React, { useRef, useState } from 'react'
import { useSlate } from 'slate-react'
import _get from 'lodash/get'
import FocusLock from 'react-focus-lock'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
    PopoverArrow,
    PopoverCloseButton,
} from '@chakra-ui/react'

import { Icons } from '@/common/ui'

import EditorIconButton from '../EditorIconButton'
import ManageLinkForm from './ManageLinkForm'
import {
    isLinkActive,
    insertLink,
    unwrapLink,
    setSelection,
    getLinkData,
} from '../../utils'

export default function LinkButton() {
    const firstFieldRef = useRef(null)
    const [url, setUrl] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const editor = useSlate()
    const selectionRef = useRef(editor.selection)

    const open = () => {
        // Store current selection because once the PopOver is opened,
        // it will lock focus, causing editor selection to go away!
        selectionRef.current = editor.selection
        setUrl(_get(getLinkData(editor), 'url') || null)
        setIsOpen(true)
    }
    const close = () => {
        setIsOpen(false)
        // Restore edtor selection after PopOver is closed.
        setSelection(editor, selectionRef.current)
    }

    const handleLinkRemove = () => {
        close()
        unwrapLink(editor)
    }

    const handleLinkAdd = url => {
        close()
        insertLink(editor, url)
    }

    return (
        <Popover
            usePortal
            isOpen={isOpen}
            initialFocusRef={firstFieldRef}
            onOpen={open}
            onClose={close}
            placement="bottom"
            closeOnBlur>
            <PopoverTrigger>
                <EditorIconButton
                    isActive={isLinkActive(editor)}
                    icon={Icons.FaLink}
                />
            </PopoverTrigger>
            <PopoverContent zIndex={4} padding={5}>
                <FocusLock returnFocus persistentFocus={false}>
                    <PopoverArrow background="white" />
                    <PopoverCloseButton />
                    <ManageLinkForm
                        firstFieldRef={firstFieldRef}
                        url={url}
                        onLinkRemove={handleLinkRemove}
                        onLinkAdd={handleLinkAdd}
                    />
                </FocusLock>
            </PopoverContent>
        </Popover>
    )
}
