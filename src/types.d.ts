interface SeactContext {
  result:[],
  searchInput:string
  setSearchInput:React.Dispatch<React.SetStateAction<string>>
  responseError:object | null 
  loading:boolean
  imgUrl:string | "NOT_FOUNDED"
  imgTags:string[]
}