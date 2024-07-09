import { useTheme } from '@emotion/react'
import { Box, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default function NotFound() {
    let theme = useTheme()
    let {t} = useTranslation()
  return (
    <Wrapper>
        <Typography variant='h1'>404</Typography>
        <Typography variant='h2'>{t('notFound')}</Typography>
        <Typography variant='h5'><GoBackBtn to='/' theme={theme}>{t('goBack')} →</GoBackBtn></Typography>
    </Wrapper>
  )
}

let Wrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 90vh;
    text-align: center;
`

let GoBackBtn = styled(Link)`
    text-decoration: none;
    color: ${({ theme }) => theme.palette.text.secondary};
    padding: 0.3rem 0.5rem;
    font-family: ${({ theme }) => theme.typography.fontFamily};
    display: block;
    margin-top: 2rem;
`
