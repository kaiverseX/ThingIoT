const GridNotes = () => {
  const renderNoteList = Array.from({length: 5}).map((_, index) => (
    <div
      key={index}
      className="min-h-[12rem] rounded-lg border border-gray-200 p-4 pb-6 transition-shadow duration-150 ease-in-out hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
    >
      <h3 className="mb-4 font-semibold tracking-tight text-gray-900 line-clamp-3 dark:text-white">
        Title
      </h3>
      <p className="mt-0 cursor-default line-clamp-10">
        {index % 2 === 0
          ? `With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and around the fjords of Norway.
          With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and around the fjords of Norway. 
          With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and around the fjords of Norway. 
          With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and around the fjords of Norway.`
          : 'Content'}
      </p>
    </div>
  ));

  return (
    <div className="my-4 grid grid-cols-[repeat(auto-fill,minmax(16rem,_1fr))] grid-rows-[masonry] gap-4">
      {renderNoteList}
    </div>
  );
};

export default GridNotes;
