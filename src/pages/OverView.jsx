
const OverView = () => {
    return (
      <div className="mb-32 flex justify-center items-center p-4 px-16 backdrop-blur-2xl rounded-2xl shadow-2xl ">
        <table className="flex flex-col items-center">
          <thead className="border rounded-md p-2 content-evenly min-w-50">
            <tr className="flex px-4 gap-8 sm:gap-2 md:gap-8 lg:gap-16">
              <th className="sm:px-4 md:px-6 lg:px-12">Date</th>
              <th className="sm:px-4 md:px-6 lg:px-12">Info</th>
              <th className="sm:px-4 md:px-6 lg:px-12">Number</th>
              <th className="sm:px-4 md:px-6 lg:px-12">Amount</th>
            </tr>
          </thead>
        </table>
      </div>
    );
}
 
export default OverView;