import Layout from '@/components/layout';
import React, { useState } from 'react';
import Image from 'next/image';
import { categoryList, CategoryType } from '@/types/categoryType';
import { useRouter } from 'next/router';
import { cls } from '@/lib/utils';

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('과일');
  const router = useRouter();
  return (
    <Layout toolbar={{ title: '카테고리', hasBackBtn: true }}>
      <main className='py-30 px-20 h-full'>
        <div className='flex flex-wrap gap-23'>
          {Object.keys(categoryList).map((category) => (
            <button
              key={category}
              className={cls(
                'flex',
                'flex-col',
                'gap-10',
                'items-center',
                category === selectedCategory ? 'text-carrot' : 'text-black'
              )}
              onClick={() => setSelectedCategory(category as CategoryType)}
            >
              <Image src={`/icons/categories/${category}.png`} alt={category} width={45} height={45} />
              <div className=' font-semibold text-16'>{category}</div>
            </button>
          ))}
        </div>
        <div className='w-full h-2 bg-[#D9D9D9] my-10'></div>
        <section className=' overflow-y-scroll h-full'>
          <div className='flex flex-wrap gap-10 overflow-y-auto'>
            {categoryList[selectedCategory].map((ingredient) => (
              <button
                key={ingredient}
                className='min-w-[30px] py-5 px-9 bg-[#F5F5F5] mr-10 mb-10 text-12 font-semibold rounded-20 hover:bg-gray-300'
                onClick={() =>
                  router.push({
                    pathname: '/ingredient',
                    query: { mode: 'new', name: ingredient, category: selectedCategory },
                  })
                }
              >
                {ingredient}
              </button>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Categories;
