// // import { journalEntries } from "../data/Product";
// // import Footer from "../ui/Footer";
// // import Header from "../ui/Header";
// // import JournalGrid from "../Features/journalsFeature/JournalGrid";

// // function JournalPage() {
// //   return (
// //     <>
// //       <Header />
// //       <main className="container mx-auto px-4 py-12 md:px-8 lg:px-16">
// //         <h1 className="mb-8 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
// //           Journal
// //         </h1>
// //         <JournalGrid journals={journalEntries} />
// //       </main>
// //       <Footer />
// //     </>
// //   );
// // }
// // export default JournalPage;

// import { useSearchParams } from "react-router-dom";
// import { useBlogs } from "../Features/journalsFeature/useBlogs";
// import Footer from "../ui/Footer";
// import Header from "../ui/Header";
// import JournalGrid from "../Features/journalsFeature/JournalGrid";
// import Pagination from "../ui/Pagination";
// import { PAGE_SIZE } from "../utils/constants";

// function JournalPage() {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const currentPage = !searchParams.get("page")
//     ? 1
//     : Number(searchParams.get("page"));

//   const { blogs = [], total = 0, isLoading } = useBlogs(currentPage);

//   const handlePageChange = (page) => {
//     const newSearchParams = new URLSearchParams(searchParams);
//     newSearchParams.set("page", page);
//     setSearchParams(newSearchParams);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <>
//       <Header />
//       <main className="container mx-auto px-4 py-12 md:px-8 lg:px-16">
//         <h1 className="mb-8 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
//           Journal
//         </h1>
//         {isLoading ? (
//           <div>Loading...</div>
//         ) : (
//           <>
//             <JournalGrid journals={blogs} />
//             <div className="mt-12">
//               <Pagination
//                 currentPage={currentPage}
//                 totalCount={total}
//                 pageSize={PAGE_SIZE}
//                 onPageChange={handlePageChange}
//               />
//             </div>
//           </>
//         )}
//       </main>
//       <Footer />
//     </>
//   );
// }

// export default JournalPage;

// pages/JournalPage.jsx
import { useSearchParams } from "react-router-dom";
import { useBlogs } from "../Features/journalsFeature/useBlogs";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import JournalGrid from "../Features/journalsFeature/JournalGrid";
import Pagination from "../ui/Pagination";
import { PAGE_SIZE } from "../utils/constants";
import Spinner from "../ui/spinner";

function JournalPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const { blogs, total, isLoading } = useBlogs(currentPage);

  const handlePageChange = (page) => {
    searchParams.set("page", page);
    setSearchParams(searchParams);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12 md:px-8 lg:px-16">
        <h1 className="mb-8 text-3xl font-bold text-gray-900 md:text-4xl">
          Journal
        </h1>

        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <JournalGrid journals={blogs} />

            <div className="mt-12">

              <Pagination count={total || 0} />
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

export default JournalPage;
