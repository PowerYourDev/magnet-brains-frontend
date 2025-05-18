

const ShowMessage = ({info}) => {

    return (
      <div className="flex justify-center items-center flex-1 h-screen ">
      <p className="text-center w-5/6 md:w-auto text-gray-600 text-lg bg-gray-100 py-4 px-6 rounded-md shadow-md">
        {info}
      </p>
    </div>
    )
  }
  
  export default ShowMessage