// import { ChevronLeft } from "lucide-react";
// import { useBlogDetail } from "./useBlogDetail";
// // import Footer from "./Footer";

// const JournalDetail = () => {
//   const { blog, isLoading, error } = useBlogDetail();
//   console.log("blog details", blog);

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Navigation Header */}
//       <div className="px-4 py-4 sm:px-6 lg:px-8">
//         <button className="flex items-center text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-gray-800">
//           <ChevronLeft className="mr-1 h-4 w-4" />
//           Back
//         </button>
//       </div>

//       {/* Article Container */}
//       <article className="px-4 sm:px-6 lg:px-8">
//         {/* Article Header */}
//         <header className="mb-8">
//           <h1 className="text-md mb-4 leading-tight font-bold text-gray-900 sm:text-2xl lg:text-2xl">
//             The Impact of Fashion on the Workplace:
//             <br /> How Technology is Changing
//           </h1>
//           <time className="text-sm font-medium text-gray-500">
//             August 30, 2022
//           </time>
//         </header>

//         {/* Hero Image */}
//         <div className="relative mb-8 overflow-hidden rounded-lg shadow-lg">
//           <div className="relative aspect-[16/9] bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900">
//             {/* Parliament Building Silhouette */}
//             <div className="absolute right-0 bottom-0 left-0 h-1/3">
//               <svg
//                 viewBox="0 0 800 200"
//                 className="h-full w-full"
//                 preserveAspectRatio="xMidYEnd slice"
//               >
//                 <path
//                   d="M0,200 L0,120 L50,120 L60,100 L70,100 L75,80 L80,80 L85,60 L90,60 L95,40 L100,40 L105,45 L110,45 L115,50 L120,50 L125,55 L130,55 L135,60 L150,60 L155,65 L180,65 L185,70 L200,70 L205,75 L220,75 L225,80 L250,80 L255,85 L280,85 L285,90 L320,90 L325,95 L350,95 L355,100 L400,100 L405,105 L450,105 L455,110 L500,110 L505,115 L550,115 L555,120 L600,120 L605,125 L650,125 L655,130 L700,130 L705,135 L750,135 L755,140 L800,140 L800,200 Z"
//                   fill="#1e293b"
//                   opacity="0.8"
//                 />
//                 {/* Gothic spires and domes */}
//                 <circle cx="400" cy="70" r="25" fill="#1e293b" opacity="0.9" />
//                 <polygon
//                   points="400,45 390,70 410,70"
//                   fill="#1e293b"
//                   opacity="0.9"
//                 />
//                 <rect
//                   x="380"
//                   y="70"
//                   width="8"
//                   height="30"
//                   fill="#1e293b"
//                   opacity="0.8"
//                 />
//                 <rect
//                   x="412"
//                   y="70"
//                   width="8"
//                   height="30"
//                   fill="#1e293b"
//                   opacity="0.8"
//                 />

//                 {/* Multiple spires */}
//                 <polygon
//                   points="200,80 195,90 205,90"
//                   fill="#1e293b"
//                   opacity="0.9"
//                 />
//                 <polygon
//                   points="600,85 595,95 605,95"
//                   fill="#1e293b"
//                   opacity="0.9"
//                 />
//                 <polygon
//                   points="300,75 295,85 305,85"
//                   fill="#1e293b"
//                   opacity="0.9"
//                 />
//                 <polygon
//                   points="500,78 495,88 505,88"
//                   fill="#1e293b"
//                   opacity="0.9"
//                 />
//               </svg>
//             </div>

//             {/* Warm lighting effect */}
//             <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 via-transparent to-slate-600/30"></div>

//             {/* Atmospheric lighting spots */}
//             <div className="absolute bottom-16 left-1/4 h-8 w-8 rounded-full bg-amber-400 opacity-60 blur-sm"></div>
//             <div className="absolute right-1/3 bottom-12 h-6 w-6 rounded-full bg-amber-300 opacity-40 blur-sm"></div>
//             <div className="absolute bottom-20 left-1/2 h-4 w-4 rounded-full bg-orange-400 opacity-50 blur-sm"></div>
//           </div>
//         </div>

//         {/* Article Content */}
//         <div className="prose prose-lg prose-gray max-w-none">
//           {/* Introduction */}
//           <p className="mb-6 text-lg leading-relaxed text-gray-700">
//             Traveling is an enriching experience that opens up new horizons,
//             exposes us to different cultures, and creates memories that last a
//             lifetime. However, traveling can also be stressful and overwhelming,
//             especially if you don't plan and prepare adequately. In this blog
//             article, we'll explore tips and tricks for a memorable journey and
//             how to make the most of your travels.
//           </p>

//           <p className="mb-8 leading-relaxed text-gray-700">
//             One of the most rewarding aspects of traveling is immersing yourself
//             in the local culture and customs. This includes trying local
//             cuisine, attending cultural events and festivals, and interacting
//             with locals. Learning a few phrases in the local language can also
//             go a long way in making connections and showing respect.
//           </p>

//           {/* Research Section */}
//           <section className="mb-8">
//             <h2 className="mb-4 text-2xl font-bold text-gray-900">
//               Research Your Destination
//             </h2>
//             <p className="mb-4 leading-relaxed text-gray-700">
//               Before embarking on your journey, take the time to research your
//               destination. This includes understanding the local culture,
//               customs, and laws, as well as identifying top attractions,
//               restaurants, and accommodations. Doing so will help you navigate
//               your destination with confidence and avoid any cultural faux pas.
//             </p>

//             <p className="mb-6 leading-relaxed text-gray-600 italic">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//               eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
//               enim ad minim veniam quis nostrud exercitation ullamco laboris
//               nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
//               reprehenderit in voluptate velit esse cillum dolore eu fugiat
//               nulla pariatur. Excepteur sint occaecat cupidatat non proident,
//               sunt in culpa qui officia deserunt mollit anim id est laborum.
//             </p>
//           </section>

//           {/* Plan Section */}
//           <section className="mb-8">
//             <h2 className="mb-4 text-2xl font-bold text-gray-900">
//               Plan Your Itinerary
//             </h2>
//             <p className="mb-4 leading-relaxed text-gray-700">
//               While it's essential to leave room for spontaneity and unexpected
//               adventures, having a rough itinerary can help you make the most of
//               your time and budget. Identify the must-see sights and experiences
//               and prioritize them according to your interests and preferences.
//               This will help you avoid overscheduling and ensure that you have
//               time to relax and enjoy your journey.
//             </p>

//             <p className="mb-6 leading-relaxed text-gray-600 italic">
//               Vitae sapien pellentesque habitant morbi tristique. Lectus
//               vestibulum lectus magna fringilla. Nec ullamcorper sit amet risus
//               nullam eget felis. Tincidunt arcu non sodales neque sodales ut
//               etiam sit amet.
//             </p>
//           </section>

//           {/* Quote Block */}
//           <blockquote className="my-8 border-l-4 border-gray-300 bg-gray-50 p-6 text-gray-700 italic">
//             "Traveling can expose you to new environments and potential health
//             risks, so it's crucial to take precautions to stay safe and
//             healthy."
//           </blockquote>

//           {/* Second Hero Image */}
//           <div className="relative my-8 overflow-hidden rounded-lg shadow-lg">
//             <div className="relative aspect-[16/9] bg-gradient-to-br from-amber-400 via-orange-300 to-pink-300">
//               {/* Sunset sky gradient */}
//               <div className="absolute inset-0 bg-gradient-to-b from-orange-200 via-amber-300 to-orange-400"></div>

//               {/* Ground/horizon */}
//               <div className="absolute right-0 bottom-0 left-0 h-1/3 bg-gradient-to-t from-green-600 to-green-400"></div>

//               {/* Traveler silhouette */}
//               <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 transform">
//                 <div className="relative">
//                   {/* Body */}
//                   <div className="h-20 w-12 rounded-t-lg bg-gray-900"></div>
//                   {/* Head */}
//                   <div className="mx-auto -mt-2 h-8 w-8 rounded-full bg-gray-900"></div>
//                   {/* Suitcase */}
//                   <div className="absolute -right-4 bottom-0 h-8 w-6 rounded bg-gray-800"></div>
//                   {/* Handle */}
//                   <div className="absolute -right-2 bottom-6 h-1 w-2 bg-gray-700"></div>
//                 </div>
//               </div>

//               {/* Clouds */}
//               <div className="absolute top-8 left-16 h-8 w-16 rounded-full bg-white/30 blur-sm"></div>
//               <div className="absolute top-12 right-20 h-6 w-20 rounded-full bg-white/20 blur-sm"></div>

//               {/* Path */}
//               <div className="absolute bottom-0 left-1/2 h-1/3 w-32 -translate-x-1/2 transform bg-gradient-to-t from-yellow-600/40 to-transparent"></div>
//             </div>
//           </div>

//           {/* Pack Section */}
//           <section className="mb-8">
//             <h2 className="mb-4 text-2xl font-bold text-gray-900">
//               Pack Lightly and Smartly
//             </h2>
//             <p className="leading-relaxed text-gray-700">
//               Packing can be a daunting task, but with some careful planning and
//               smart choices, you can pack light and efficiently. Start by making
//               a packing list and sticking to it, focusing on versatile and
//               comfortable clothing that can be mixed and matched. Invest in
//               quality luggage and packing organizers to maximize space and
//               minimize wrinkles.
//             </p>
//           </section>

//           {/* Stay Safe Section */}
//           <section className="mb-8">
//             <h2 className="mb-4 text-2xl font-bold text-gray-900">
//               Stay Safe and Healthy
//             </h2>
//             <p className="leading-relaxed text-gray-700">
//               Traveling can expose you to new environments and potential health
//               risks, so it's crucial to take precautions to stay safe and
//               healthy. This includes researching any required vaccinations or
//               medications, staying hydrated, washing your hands frequently, and
//               using sunscreen and insect repellent. It's also essential to keep
//               your valuables safe and secure and to be aware of your
//               surroundings at all times.
//             </p>
//           </section>

//           {/* Immerse Section */}
//           <section className="mb-8">
//             <h2 className="mb-4 text-2xl font-bold text-gray-900">
//               Immerse Yourself in the Local Culture
//             </h2>
//             <p className="leading-relaxed text-gray-700">
//               One of the most rewarding aspects of traveling is immersing
//               yourself in the local culture and customs. This includes trying
//               local cuisine, attending cultural events and festivals, and
//               interacting with locals. Learning a few phrases in the local
//               language can also go a long way in making connections and showing
//               respect.
//             </p>
//           </section>

//           {/* Capture Memories Section */}
//           <section className="mb-8">
//             <h2 className="mb-4 text-2xl font-bold text-gray-900">
//               Capture Memories
//             </h2>
//             <p className="mb-4 leading-relaxed text-gray-700">
//               Finally, don't forget to capture memories of your journey. Whether
//               it's through photographs, journaling, or souvenirs, preserving the
//               moments and experiences of your travels can bring joy and
//               nostalgia for years to come. However, it's also essential to be
//               present in the moment and not let technology distract from the
//               beauty of your surroundings.
//             </p>
//           </section>

//           {/* Conclusion */}
//           <section className="mx-auto mb-12 max-w-4xl">
//             <h2 className="mb-6 text-2xl font-bold text-gray-900">
//               Conclusion:
//             </h2>
//             <div className="rounded-lg bg-gray-50 p-6">
//               <ul className="space-y-3 text-gray-700">
//                 <li className="flex items-start">
//                   <div className="mt-2.5 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-gray-400"></div>
//                   <span>
//                     Traveling is an art form that requires a blend of planning,
//                     preparation, and spontaneity.
//                   </span>
//                 </li>
//                 <li className="flex items-start">
//                   <div className="mt-2.5 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-gray-400"></div>
//                   <span>
//                     By following these tips and tricks, you can make the most of
//                     your journey and create memories that last a lifetime.
//                   </span>
//                 </li>
//                 <li className="flex items-start">
//                   <div className="mt-2.5 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-gray-400"></div>
//                   <span>
//                     So pack your bags, embrace the adventure, and enjoy the
//                     ride.
//                   </span>
//                 </li>
//               </ul>
//             </div>
//           </section>
//         </div>
//       </article>
//       {/* <Footer /> */}
//     </div>
//   );
// };

// export default JournalDetail;

import { ChevronLeft, Calendar, Eye, Tag } from "lucide-react";
import { useBlogDetail } from "./useBlogDetail";

const JournalDetail = () => {
  const { blog, isLoading, error } = useBlogDetail();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-gray-300 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <p className="text-red-600 text-lg font-medium">Error loading article</p>
          <p className="mt-2 text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">No article found</p>
      </div>
    );
  }

  // Parse featured images if they exist
  const featuredImages = blog.featured_images
    ? (typeof blog.featured_images === 'string'
      ? JSON.parse(blog.featured_images)
      : blog.featured_images)
    : [];

  // Parse tags if they exist
  const tags = blog.tags
    ? (typeof blog.tags === 'string'
      ? JSON.parse(blog.tags)
      : blog.tags)
    : [];

  // Format date
  const formattedDate = blog.created_at
    ? new Date(blog.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    : '';

  // Split content into paragraphs
  const paragraphs = blog.content ? blog.content.split('\n\n').filter(p => p.trim()) : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-gray-900 group"
          >
            <ChevronLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Articles
          </button>
        </div>
      </div>

      {/* Article Container */}
      <article className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Article Header */}
        <header className="mb-8">
          {/* Category Badge */}
          {blog.category && (
            <div className="mb-4">
              <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
                {blog.category}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
            {blog.title}
          </h1>

          {/* Excerpt */}
          {blog.excerpt && (
            <p className="text-xl text-gray-600 leading-relaxed mb-6">
              {blog.excerpt}
            </p>
          )}

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            {formattedDate && (
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <time dateTime={blog.created_at}>{formattedDate}</time>
              </div>
            )}
            {blog.view_count !== undefined && (
              <div className="flex items-center gap-1.5">
                <Eye className="h-4 w-4" />
                <span>{blog.view_count.toLocaleString()} views</span>
              </div>
            )}
          </div>
        </header>

        {/* Featured Image */}
        {featuredImages.length > 0 && (
          <div className="relative mb-12 overflow-hidden rounded-2xl shadow-2xl">
            <div className="aspect-[16/9] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <svg className="mx-auto h-16 w-16 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm">{featuredImages[0]}</p>
              </div>
            </div>
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg prose-gray max-w-none">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="mb-6 text-gray-700 leading-relaxed text-lg"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Tags Section */}
        {tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-start gap-3">
              <Tag className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Additional Images */}
        {featuredImages.length > 1 && (
          <div className="mt-12 grid grid-cols-2 gap-4">
            {featuredImages.slice(1).map((image, index) => (
              <div key={index} className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg overflow-hidden shadow-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <svg className="mx-auto h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-xs">{image}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Share Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Last updated: {blog.updated_at ? new Date(blog.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
            </p>
            <button className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">
              Share Article
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default JournalDetail;