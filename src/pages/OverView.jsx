import useFetch from "../hooks/useFetch";


const OverView = () => {

  const { data = [], loading, error } = useFetch("overview");

  if(loading){
    return(<div className="p-8 font-bold">Loading...</div>)
  }

  if(error){
    return (<div className="p-8 text-red-500 font-bold">Error: {error}</div>)
  }

  console.log(data);
  

  return (
    <div className="min-h-screen">
        {data.map((item)=> {
          return (
            <div key={item.id}
            className="mx-20"
            >
              <p>{item.created_at}</p>
            </div>
          )
        })}
    </div>
  );
};

export default OverView;
