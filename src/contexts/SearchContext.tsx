import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const SearchContext = createContext<SeactContext>({
  loading: false,
  responseError: null,
  result: [],
  searchInput: "",
  setSearchInput: () => { },
  imgUrl: "",
  imgTags:[]
})

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchInput, setSearchInput] = useState<string>("start")
  const [result, setResult] = useState<[]>([])
  const [responseError, setResponseError] = useState<object | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [imgUrl, setImgUrl] = useState("")
  const [imgTags, setImgTags] = useState<string[]>([])
  const search = () => {
    setResponseError(null)
    setLoading(true)
    setImgUrl("")
    setResult([])

    axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchInput}`)
      .then(res => {
        setResult(res.data)
        axios.get(`https://pixabay.com/api/?key=33174454-b7862a6203ff42cb4732579d9&q=${res.data[0].word}&image_type=photo&pretty=true`).then(res2 => {
          if(res2.data.total === 0) {
            setImgUrl("NOT_FOUNDED")
          }
          setImgUrl(res2.data.hits[0].webformatURL)
          setImgTags(res2.data.hits[0].tags.split(","))
          console.log(res.data)
          setLoading(false)
        })
        .catch(err2 => console.log("Image Not Founded::.", err2))
      })
      .catch(err => setResponseError(err))
  }
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  useEffect(() => {
    search()
  }, [searchInput])

  return (
    <SearchContext.Provider value={{ searchInput, setSearchInput, result, responseError, loading, imgUrl,imgTags }}>
      {children}
    </SearchContext.Provider>
  )
}