import React from 'react'
import Body from '../components/Body'
import Title from '../components/Title'
import Axios from 'axios'
import { Buffer } from 'buffer'
import ReactMarkdown from 'react-markdown'
import rehypeSanitize from 'rehype-sanitize'
import remarkHtml from 'remark-html'

const About = () => {
  const [readme, setReadme] = React.useState('')
  const [lastUpdated, setLastUpdated] = React.useState('')
  console.log(lastUpdated)

  React.useEffect(() => {
    Axios.get(
      'https://api.github.com/repos/nurkholiqansori/MERN-Lecturer/readme',
    ).then((res) => {
      setReadme(res.data.content)
    })
    Axios.get(
      'https://api.github.com/repos/nurkholiqansori/MERN-Lecturer').then((res) => {
        setLastUpdated(res.data.updated_at)
      }
    )
  }, [])

  const date = new Date(lastUpdated)
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour24: true,
  }
  const formattedDate = date.toLocaleDateString('en-US', options)
  
  console.log(formattedDate)

  const rawMarkup = Buffer.from(readme, 'base64').toString('ascii')

  const H1 = ({ node, ...props }) => (
    <h1 className='text-xl font-semibold my-2'>{props.children}</h1>
  )
  const H2 = ({ node, ...props }) => (
    <h2 className='text-lg font-semibold my-3'>{props.children}</h2>
  )
  const Code = ({ node, ...props }) => (
    <code className=' bg-gray-200 text-gray-600 font-mono p-2 mx-2 my-4 rounded-lg'>
      {props.children}
    </code>
  )
  const Paragraph = ({ node, ...props }) => (
    <p className='mb-2'>{props.children}</p>
  )
  const Pre = ({ node, ...props }) => (
    <pre className='bg-gray-200 text-gray-600 font-mono p-2 mx-2 my-4 rounded-lg'>
      {props.children}
    </pre>
  )
  const Blockquote = ({ node, ...props }) => (
    <blockquote className='mb-2 bg-gray-400 color-gray-900 p-3 border-l-4 border-gray-900'>{props.children}</blockquote>
  )
  const UnorderedList = ({ node, ...props }) => (
    <ul className='list-decimal'>{props.children}</ul>
  )
  const Li = ({ node, ...props }) => (
    <li className='mb-2'>{props.children}</li>
  )

  return (
    <Body>
      <Title>About</Title>
      <div className=''>
        <ReactMarkdown
          remarkPlugins={[remarkHtml]}
          rehypePlugins={[rehypeSanitize]}
          components={{
            h1: H1,
            h2: H2,
            code: Code,
            p: Paragraph,
            pre: Pre,
            ul: UnorderedList,
            li: Li,
            blockquote: Blockquote
          }}
        >
          {rawMarkup}
        </ReactMarkdown>
      </div>
    </Body>
  )
}

export default About
