import MagicIframe from '../../components/MagicIframe';

export default function BlogPage() {
    return <div>
      <MagicIframe src="https://roboticsuniversity.observablehq.cloud/dynamicbotnotebook/" />
    </div>;
}
// export default function BlogPage() {
//     return (
//       <div className="min-h-screen bg-black text-white px-4 py-16 max-w-4xl mx-auto">
//         {/* Header */}
//         <header className="mb-16">
//           <h1 className="text-5xl font-bold leading-tight mb-6">
//             Writing on computer graphics,machine learning, and infrastructure.
//           </h1>
//           {/* <p className="text-gray-400 text-lg">
//             All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order.
//           </p> */}
//         </header>

//         {/* Blog Posts List */}
//         <div className="space-y-16">
//           {/* Blog Post 1 */}
//           <article className="group">
//             <div className="flex items-baseline gap-6">
//               <time className="text-gray-500 shrink-0">September 5, 2022</time>
//               <div>
//                 <h2 className="text-xl font-semibold mb-3">
//                   <a href="/blog/dynamicland_2025" className="hover:text-emerald-400 transition-colors">
//                    Dynamicland is a collaborative thinking space for shared reasoning
//                   </a>
//                 </h2>
//                 <p className="text-gray-400 mb-3">
//                   Dynamicland is a collaborative thinking space for shared reasoning that assists all human beings in making intractable problems tractable.
//                 </p>
//                 <a href="/blog/dynamicland_2025" className="text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center">
//                   Read article
//                   <span className="ml-1">→</span>
//                 </a>
//               </div>
//             </div>
//           </article>

//           {/* Blog Post 2 */}
//           <article className="group hidden">
//             <div className="flex items-baseline gap-6">
//               <time className="text-gray-500 shrink-0">September 2, 2022</time>
//               <div>
//                 <h2 className="text-xl font-semibold mb-3">
//                   <a href="/blog/health_tensor_hospital_of_the_future" className="hover:text-emerald-400 transition-colors">
//                     Health Tensor is the Hospital of the Future
//                   </a>
//                 </h2>
//                 <p className="text-gray-400 mb-3">
//                   Health Tensor is the hospital of the future - assisting physicians to solve complex problems.
//                 </p>
//                 <a href="/blog/health_tensor_hospital_of_the_future" className="text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center">
//                   Read article
//                   <span className="ml-1">→</span>
//                 </a>
//               </div>
//             </div>
//           </article>


//         </div>
//       </div>
//     );
//   }
