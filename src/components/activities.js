export default function ActivitiesList({ data }) {
  if (!data || !data.categories) {
    return <div className="p-6 text-center text-gray-500">Loading activities...</div>
  }

  const { metadata, categories } = data

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">

      {/* Page header */}
      <div className="mb-10">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Activities & Hobbies</h1>
        <p className="text-sm text-gray-500">Portsmouth, UK — gear available to rent for most activities</p>
      </div>

      {/* Scale guide */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 mb-12 flex flex-wrap gap-6 text-sm text-gray-600">
        <span><span className="font-medium text-gray-800">Spoons:</span> 1 = very easy, 5 = high effort</span>
        <span><span className="font-medium text-gray-800">Cost:</span> £ &lt;£20 · ££ £20–60 · £££ £60–150 · ££££ £150+/month</span>
      </div>

      <div className="space-y-14">
        {categories.map((categoryGroup) => (
          <section key={categoryGroup.category}>

            {/* Category heading */}
            <h2 className="text-xs font-semibold uppercase tracking-widest text-sage-special mb-6">
              {categoryGroup.category}
            </h2>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryGroup.hobbies.map((item) => (
                <div
                  key={item.hobby}
                  className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col hover:shadow-md hover:border-sage-special/30 transition-all"
                >
                  {/* Tags row — sits above the title */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                      {item.spoons}/5 spoons
                    </span>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                      {item.cost}
                    </span>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 capitalize">
                      {item.place}
                    </span>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 capitalize">
                      {item.social}
                    </span>
                  </div>

                  {/* Title — intentionally modest */}
                  <h3 className="text-base font-semibold text-gray-900 mb-2">
                    {item.hobby}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-500 leading-relaxed flex-grow mb-5">
                    {item.description}
                  </p>

                  {/* Local spots */}
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                      Local spots
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.local_places.map((place, index) => (
                        <span
                          key={index}
                          className="text-xs text-sage-special bg-sage-special/5 border border-sage-special/10 px-2 py-0.5 rounded-full"
                        >
                          {place}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}