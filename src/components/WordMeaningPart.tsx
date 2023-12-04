import React, { useContext, useEffect, useState } from 'react'
import audio_icon from '../assets/icons/audio.svg'
import mark_icon from '../assets/icons/mark.svg'
import speaking_icon from '../assets/icons/speaking.svg'
import similar_icon from '../assets/icons/similar.png'
import opposite_icon from '../assets/icons/opposite.png'

import { SearchContext } from '../contexts/SearchContext'
import SearchInput from './SearchInput'
const WordMeaningPart = () => {
  const { result, loading, searchInput, responseError, setSearchInput, imgUrl, imgTags } = useContext(SearchContext)
  const audio = new Audio(result[0]?.phonetics.audio)
  const [soundUrl, setSoundURL] = useState("")
  const [isPlaying, setIsPlaying] = useState(false);
  audio.loop = true

  const recomendedWords = [
    'Explore',
    'Initialize',
    'Optimize',
    'Authenticate',
    'Integrate',
    'Navigate',
    'Validate',
    'Customize',
    'Authorize'
  ];

  useEffect(() => {
    if (result[0]?.phonetics[0]) {
      setSoundURL(result[0]?.phonetics[0].audio)
    }
  }, [result])



  const playAudio = () => {
    if (result[0]?.phonetics[0]) {
      if (result[0]?.phonetics[0].audio !== "") {
        const audio = new Audio(soundUrl);
        if (isPlaying) {
          audio.pause();
        } else {
          audio.play();
        }
      }
    }
  };
  if (responseError) {
    return (
      <div className='h-[80vh]  flex items-center justify-center flex-col'>
        <h1 className='font-semibold text-2xl text-center'>"{searchInput}" Not Founded</h1>
        <p>You can try these</p>
        <div className='flex gap-3 flex-wrap w-2/3 items-center justify-center mt-5'>
          {
            recomendedWords.map(word => (
              <button key={word} onClick={() => setSearchInput(word)} className='rounded-full flex bg-green-300 px-2 py-1 text-sm w-auto hover:bg-green-400 transition-all duration-150'>{word}</button>
            ))
          }
        </div>
      </div>
    )
  } else {
    return (
      <>
        {
          searchInput === "" && result.length === 0 ? (
            <div>Start Now</div>
          ) : (
            <>
              {
                loading && result.length === 0 ? (
                  <span>Loading...</span>
                ) : (
                  <div className='grid grid-cols-8 gap-5 items-start justify-start mt-20'>
                    <div className='lg:col-span-2 md:col-span-4 col-span-8'>
                      <div className=' w-full rounded-lg bg-slate-100 shadow-2xl'>
                        {
                          imgUrl ? (
                            <>
                              {
                                imgUrl === "NOT_FOUNDED" ? (
                                  <span className='text-xs'>No images found for this word</span>
                                ) : (
                                  <>
                                    <p className='p-3 text-xs'> <span className='font-bold'>Not:</span>Images may not always reflect reality</p>
                                    <img src={imgUrl} alt="Word Image" className='rounded-lg w-full p-3' />
                                    <div className='flex gap-3 p-2'>
                                      {
                                        imgTags.map(word => (
                                          <button key={word} onClick={() => setSearchInput(word)} className='rounded-full flex bg-green-300 px-4 py-2 w-auto hover:bg-green-400 transition-all duration-150'>
                                            <span className='text-xs font-bold'>{word}</span>
                                          </button>
                                        ))
                                      }
                                    </div>
                                  </>
                                )
                              }
                            </>
                          ) : (
                            <div>Loading...</div>
                          )
                        }
                      </div>
                    </div>
                    {/* meaning part */}
                    <div className='p-4 lg:col-span-6 md:col-span-8 col-span-8 h-full'>
                      <div className='flex items-start justify-start gap-8'>
                        <div className=''>
                          <h1 className='text-5xl font-bold tracking-wide'>{result[0]?.word}</h1>
                          {
                            result[0]?.phonetics[0] && (
                              <div className='flex gap-10'>
                                <p className='mt-3 text-slate-400 italic'>{result[0]?.phonetics[0].text}</p>
                                <a href={result[0]?.phonetics[0].sourceUrl} target='_blank' className='mt-3 text-blue-400 font-bold underline'>Resourch</a>
                              </div>
                            )
                          }
                        </div>
                        {
                          result[0]?.phonetics[0] && (
                            <>
                              {
                                result[0]?.phonetics[0].audio !== "" && (
                                  <button onClick={playAudio} className='mt-1 bg-slate-200 p-2 rounded-lg  hover:bg-slate-300 transition-all duration-150'>
                                    <img src={audio_icon} alt="Audio Icon" className='w-8' />
                                  </button>
                                )
                              }
                            </>
                          )
                        }
                      </div>
                      <div className='mt-10'>
                        <h2 className='text-3xl font-semibold '>Meanings</h2>
                        {
                          result[0]?.meanings.map((data: any, key: any) => (
                            <div key={key} className='p-2 mt-5'>
                              <div className='mb-10'>
                                <p className='font-bold mb-5 text-xl'>{data.partOfSpeech}:</p>
                                {
                                  data.definitions.map((def: any, key2: any) => (
                                    <div key={key2} className='border p-2 rounded-lg shadow-lg mt-1 mb-5 hover:bg-slate-200'>
                                      <p className='p-1 flex items-start justify-start gap-4 font-bold'>
                                        <img src={mark_icon} alt="Mark Icon" className='w-5 mt-1' />
                                        {
                                          def.definition
                                        }
                                      </p>

                                      <p className='pl-5 mt-2 text-sm text-slate-500 flex items-start justify-start gap-2 font-semibold italic'>
                                        <img src={speaking_icon} alt="Speaking Icon" className='w-6 mt-1' />
                                        " {def.example}"</p>

                                    </div>
                                  ))
                                }

                                <div className=' p-2'>
                                  {
                                    data.synonyms.length !== 0 && (
                                      <div className='mt-5'>
                                        <h4 className='font-bold flex gap-2'>
                                          <img src={similar_icon} alt="Synonyms Icon" className='w-4' />
                                          Synonyms
                                        </h4>
                                        <div className='flex flex-wrap gap-3 mt-2 '>
                                          {
                                            data.synonyms.map((word: any, key: any) => (
                                              <>
                                                {
                                                  word.split(" ").length === 1 ? (
                                                    <button onClick={() => setSearchInput(word)} key={key} className='rounded-full flex bg-green-300 px-4 py-2 w-auto hover:bg-green-400 transition-all duration-150'>
                                                      <span className='text-xs font-bold'>{word}</span>
                                                    </button>
                                                  ) : (
                                                    <button disabled key={key} className='rounded-full flex bg-slate-200 px-4 py-2 w-auto transition-all duration-150'>
                                                      <span className='text-xs font-bold text-gray-500'>{word}</span>
                                                    </button>
                                                  )
                                                }
                                              </>
                                            ))
                                          }

                                        </div>
                                      </div>
                                    )
                                  }
                                  {
                                    data.antonyms.length !== 0 && (
                                      <div className='mt-10'>
                                        <h4 className='font-bold flex gap-2'>
                                          <img src={opposite_icon} alt="Antonyms Icon" className='w-4' />
                                          Antonyms
                                        </h4>
                                        <div className='flex flex-wrap gap-3 mt-2 '>
                                          {
                                            data.antonyms.map((word, key) => (
                                              <>
                                                {word.split(" ").length === 1 ? (
                                                  <button onClick={() => setSearchInput(word)} key={key} className='rounded-full flex bg-green-300 px-4 py-2 w-auto hover:bg-green-400 transition-all duration-150'>
                                                    <span className='text-xs font-bold'>{word}</span>
                                                  </button>
                                                ) : (
                                                  <button disabled key={key} className='rounded-full flex bg-slate-200 px-4 py-2 w-auto   transition-all duration-150'>
                                                    <span className='text-xs font-bold text-gray-500'>{word}</span>
                                                  </button>
                                                )}
                                              </>
                                            ))
                                          }

                                        </div>
                                      </div>
                                    )
                                  }
                                </div>
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                )
              }
            </>
          )
        }
      </>
    )
  }
}

export default WordMeaningPart