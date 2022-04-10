import React from 'react'
import Body from './Body'
import Title from './Title'
import { toast } from 'react-toastify'
import md5 from 'md5'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const [img, setImg] = React.useState({ file: null, preview: null })
  const navigate = useNavigate()
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    noClick: true,
    maxFiles: 1,
    accept: '.jpg, .jpeg, .png',
    onDrop: (acceptedFiles, fileRejections) => {
      if (fileRejections.length > 0) {
        toast('Please upload only image file')
        return false
      }
      const file = acceptedFiles[0]
      const reader = new FileReader()
      reader.onabort = () => toast('file reading was aborted')
      reader.onerror = () => toast('file reading has failed')
      reader.onload = () => {
        setImg({ file: file, preview: URL.createObjectURL(file) })
      }
      reader.readAsBinaryString(file)
    },
  })

  const dataUser = JSON.parse(localStorage.getItem('user'))
  const hashGravatar = md5(dataUser.email)
  const gravatarUrl = `https://www.gravatar.com/avatar/${hashGravatar}`

  React.useEffect(() => {
    return () => URL.revokeObjectURL(img.preview)
  }, [img.preview])

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const data = new FormData(form)
    const tempUrl = data.get('title').search(' ')
    let stringUrl
    if (tempUrl === -1) {
      stringUrl = data.get('title').toLowerCase()
    } else {
      stringUrl = data.get('title').replaceAll(' ', '-').toLowerCase()
    }
    let datas = new FormData()
    datas.append('title', data.get('title'))
    datas.append('url', stringUrl)
    datas.append('thumbnail', img.file)
    datas.append('content', data.get('content'))
    console.log(datas)

    const uploadOptions = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent
        const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000))
        if (percentage === 100) {
          toast('Successfully Uploaded')
        }
      },
    }

    axios
      .post('http://localhost:8000/api/articles', datas, uploadOptions)
      .then((res) => {
        console.log(res)
        toast('Article created')
        navigate('/articles')
      })
      .catch((err) => {
        console.log(err)
        toast('Article not created', 'error')
      })
  }

  return (
    <Body>
      <Title>Dashboard</Title>
      <div className='flex flex-wrap justify-center md:justify-between items-center mb-5 gap-5'>
        <div className='w-full lg:mb-0 md:mb-10 px-8'>
          <div className='px-3'>
            <img
              alt={dataUser.name + ' Gravatar'}
              src={gravatarUrl}
              className='shadow-lg rounded-full mx-auto max-h-44'
            />
            <div className='pt-5 text-center'>
              <h5 className='text-xl font-bold text-blueGray-700'>
                {dataUser.name}
              </h5>
            </div>
          </div>
        </div>
        <a
          href='https://id.gravatar.com/'
          title='Gravatar'
          target='_blank'
          rel='noreferrer noopener'
        >
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer transition-all duration-150'>
            Change Gravatar
          </button>
        </a>

        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer transition-all duration-150'
          onClick={() => {
            toast('Logout Success')
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            window.location.reload()
          }}
        >
          Sign Out
        </button>
      </div>
      <Title>Add Article</Title>
      <form encType='multipart/form-data' onSubmit={(e) => handleSubmit(e)}>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full px-3'>
            {img.preview ? (
              <img
                src={img.preview}
                alt='thumbnail'
                className='rounded-lg w-1/2 mx-auto my-5'
              />
            ) : (
              ''
            )}
            {img.preview ? (
              <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer my-5 mx-auto block transition-all duration-150'
                onClick={() => setImg({ file: null, preview: null })}
              >
                Reset Image
              </button>
            ) : (
              <label
                className={
                  'flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase cursor-pointer hover:bg-blue hover:text-gray-500 my-5 w-full transition-all duration-150 ' +
                  (isDragActive
                    ? 'border-4 border-dashed'
                    : 'border border-blue ')
                }
                {...getRootProps()}
              >
                <svg
                  className='w-8 h-8'
                  fill='currentColor'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                >
                  <path d='M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z' />
                </svg>
                <span className='mt-2 text-base leading-normal'>
                  {isDragActive ? (
                    <p className='text-blue text-center'>Drop the file here</p>
                  ) : (
                    <p className='text-blue text-center'>
                      Drag and drop image here, or click to select files
                    </p>
                  )}
                </span>
                <input {...getInputProps()} name='thumbnail' hidden />
              </label>
            )}
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='title-article'
            >
              Title
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 transition-all duration-150'
              id='title-article'
              type='text'
              name='title'
              placeholder='Title'
              required
            />
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='content-article'
            >
              Content
            </label>
            <textarea
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='content-article transition-all duration-150'
              type='text'
              name='content'
              multiline
              placeholder='Content'
              required
            />
            <input
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer transition-all duration-150'
              value='Submit'
            />
          </div>
        </div>
      </form>
    </Body>
  )
}

export default Dashboard
