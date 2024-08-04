
export default function SkeletonPage () {

    return (
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 mt-5">
            {[...Array(6)].map((item, index) => (
              <div className="mt-2 p-2 bg-muted/30 rounded-xl flex items-center hover:scale-105 transition-transform duration-300 " key={index}>
                <div className="aspect-square h-14 w-14 rounded-lg object-cover md:h-20 md:w-20"  />
                <div className="ml-3 text-white">
                  <h6 className="text-xs font-bold"></h6>
                  <p className="text-xs"></p>
                </div>
              </div>
            ))}
          </ul>
    )
}