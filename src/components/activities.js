import Link from "next/link"

export default function ActivitiesList({ data }) {
  if (!data || !data.categories) {
    return <div className="p-6 text-center text-gray-500">Loading activities...</div>
  }

  const { categories } = data

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">

      {/* Page header */}
      <div className="mb-10">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Activities & Hobbies</h1>
        <p className="text-sm text-gray-500">Portsmouth, UK — gear available to rent for most activities</p>
      </div>

      {/* Scale guide */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 mb-12 text-sm text-gray-600 space-y-2">
        <p><span className="font-medium text-gray-800">Spoons:</span> 1 = very easy &nbsp; 2 = low &nbsp; 3 = moderate &nbsp; 4 = high &nbsp; 5 = very high effort</p>
        <p><span className="font-medium text-gray-800">Cost:</span> &nbsp; £ = under £20/month &nbsp;&nbsp; ££ = £20–60 &nbsp;&nbsp; £££ = £60–150 &nbsp;&nbsp; ££££ = £150+</p>
        <p><span className="font-medium text-gray-800">Location:</span> near Portsmouth, UK</p>
      </div>

      <div className="space-y-14">
        {categories.map((categoryGroup) => (
          <section key={categoryGroup.category}>

            {/* Category heading */}
            <h2 className="text-xl font-semibold uppercase tracking-widest text-sage-special mb-6">
              {categoryGroup.category}
            </h2>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryGroup.hobbies.map((item) => (
                <div
                  key={item.hobby}
                  className="rounded-lg border border-gray-200 p-4 bg-white hover:shadow-sm transition-shadow flex flex-col"
                >
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">{item.hobby}</h3>
                  <p className="text-xs text-gray-500 mb-3 leading-relaxed flex-grow">
                    {item.description.split('.')[0]}.
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                      {item.spoons}/5 spoons
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                      {item.cost}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 capitalize">
                      {item.place}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 capitalize">
                      {item.social}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 mb-3">
                    {item.local_places[0]}{item.local_places.length > 1 ? ` +${item.local_places.length - 1} more` : ''}
                  </span>
                  <Link
                    href={`/activities/${item.hobby.toLowerCase().replace(/\s+/g, '-')}`}
                    className="mt-auto w-full py-1.5 rounded-md text-xs font-medium bg-gray-100 text-gray-600 hover:bg-sage-special hover:text-white transition-colors border border-gray-200 text-center"
                    >
                      View activity
                  </Link>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}