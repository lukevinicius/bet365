export function MatchesInPlay() {
  return (
    <div>
      <div className="bg-blue-900 flex items-center rounded-t-md py-1 px-5 justify-between">
        <p className="font-bold">Ao Vivo</p>
        <p className="text-[0.8rem]">267 Eventos {'>'}</p>
      </div>
      <div>
        <div className="flex items-center border-b-[1px] border-[#6e6e6e] bg-[#a0a0a0]">
          <p className="w-1/2 py-1 px-5 font-bold">Futebol</p>
          <div className="flex w-1/2 text-center">
            <p className="w-1/3">1</p>
            <p className="w-1/3">X</p>
            <p className="w-1/3">3</p>
          </div>
        </div>
        <div className="flex border-b-[1px] border-[#6e6e6e]">
          <div className="w-1/2 h-16 py-1 px-5 border-r-[1px] border-[#6e6e6e] bg-[#646464]">
            <div className="flex space-x-3 items-center">
              <div className="text-[0.8rem]">
                <p>11:34</p>
              </div>
              <div className="w-full">
                <div className="flex justify-between">
                  <p>Manchester city</p>
                  <p className="font-bold">0</p>
                </div>
                <div className="flex justify-between">
                  <p>Real Madrid</p>
                  <p className="font-bold">2</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-1/2 h-16 bg-[#5a5a5a] text-[#ffdf1b]">
            <p className="flex w-1/3 p-1 items-center justify-center border-r-[1px] border-[#6e6e6e]">
              1.25
            </p>
            <p className="flex w-1/3 p-1 items-center justify-center border-r-[1px] border-[#6e6e6e]">
              2.00
            </p>
            <p className="flex w-1/3 p-1 items-center justify-center border-r-[1px] border-[#6e6e6e]">
              3.75
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
