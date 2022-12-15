import {useTranslation} from 'react-i18next';
import {Button} from '@mantine/core';
import {IconPlus} from '@tabler/icons';

import {Head} from '~/outlet/Head';

const Homepage = () => {
  const {t} = useTranslation();

  const renderNoteList = Array(5).map((_, index) => (
    <div
      key={index}
      className="h-48 rounded-lg border border-solid border-gray-200 p-4 pb-6 transition-shadow duration-150 ease-in-out hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
    >
      <h3 className="mb-4 font-semibold tracking-tight text-gray-900 line-clamp-3 dark:text-white">
        Title
      </h3>
      <p className="mt-0 cursor-default line-clamp-10">Content</p>
    </div>
  ));

  return (
    <>
      <Head />
      <div className="mb-4">
        <Button
          leftIcon={<IconPlus size={20} />}
          variant="outline"
          styles={() => ({leftIcon: {marginRight: 5}})}
          radius="md"
        >
          {t('notes.pageTitle')}
        </Button>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(16rem,_1fr))] grid-rows-[masonry] gap-4">
        {renderNoteList}
      </div>
      {/* <Image src="src/assets/animated/decor/4.svg" alt="Random decor image" /> */}
    </>
  );
};

export default Homepage;
