import Layout from '@/components/layout';
import React, { useEffect, useState } from 'react';
import StorageArea, { storageAreaMapping } from '../types/storageAreaType';
import { cls, getDDate } from '@/lib/utils';
import AppResponseType from '@/types/appResponseType';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface DataResponseType {
  categories: string[];
  ingredients: {
    id: number;
    name: string;
    category: string;
    storageArea: StorageArea;
    count: number;
    expirationDate: string;
  }[];
}

const Home = () => {
  const [tab, setTab] = useState<StorageArea>('freezer');
  const [data, setData] = useState<DataResponseType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  // tab에 해당하는 식재료들
  const currIngredients = data?.ingredients.filter((i) => i.storageArea === tab);
  const currCategories = data?.categories.filter((category) =>
    currIngredients?.map((i) => i.category).includes(category)
  );

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get<AppResponseType<DataResponseType>>('http://localhost:3001/api/ingredients', {
          headers: {
            jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzIiwibmlja25hbWUiOiJ0ZXN0IiwiaWF0IjoxNjg2NTcxNDI1LCJleHAiOjE2ODkxNjM0MjV9.79nry30Eppc4SbeALuRKwrCyCX4KgnodJ7rFl7uhXAY',
          },
        });
        if (response.status === 200) {
          setData(response.data.result);
          setIsLoading(false);
        }
      } catch {}
    })();
  }, []);
  return (
    <Layout toolbar={{ title: '냉장고를 부탁해', hasBackBtn: true }}>
      <div className=' flex items-center'>
        {Object.keys(storageAreaMapping).map((key) => (
          <button
            key={key}
            className={cls(
              'w-[33.3%]',
              'h-50',
              'flex',
              'justify-center',
              'items-center',
              'font-semibold',
              tab === key ? 'bg-white text-carrot' : 'bg-[#F5F5F5] text-black'
            )}
            onClick={() => setTab(key as StorageArea)}
          >
            {storageAreaMapping[key as StorageArea]}
          </button>
        ))}
      </div>
      <main className=' h-full px-20 pt-30 pb-100 overflow-y-scroll '>
        {data && currIngredients?.length
          ? currCategories?.map((category) => {
              const ingredients = currIngredients
                .filter((i) => i.category === category)
                .sort((a, b) => getDDate(b.expirationDate) - getDDate(a.expirationDate));

              return (
                <article key={category} className=' mb-80'>
                  <h4 className=' font-semibold text-16'>{`${category}(${ingredients.length})`}</h4>
                  <div className=' w-full bg-[#D9D9D9] h-2 mt-5 mb-10'></div>
                  <div className='flex flex-wrap gap-5'>
                    {ingredients.map((i) => (
                      <div key={i.id} className='flex mb-10'>
                        <div className='flex justify-center items-center py-0 px-5 text-white text-2 font-medium bg-carrot rounded-100 self-start z-10'>
                          {getDDate(i.expirationDate) > 0
                            ? `D+${getDDate(i.expirationDate)}`
                            : getDDate(i.expirationDate) == 0
                            ? `D-${getDDate(i.expirationDate)}`
                            : `D${getDDate(i.expirationDate)}`}
                        </div>
                        <button
                          onClick={() =>
                            router.push({
                              pathname: '/ingredient',
                              query: {
                                mode: 'edit',
                                ...i,
                              },
                            })
                          }
                          className='min-w-[30px] mt-5 ml-[-15px] flex justify-center items-center ml-[-5px] rounded-100 bg-[#F5F5F5] text-12 font-semibold py-5 px-10 self-end hover:bg-gray-200'
                        >
                          {i.name}
                        </button>
                      </div>
                    ))}
                  </div>
                </article>
              );
            })
          : null}
        {isLoading && <div className=' flex justify-center items-center font-semibold'>Loading...</div>}
        {!currIngredients?.length && (
          <div className=' flex justify-center items-center font-semibold'>보관중인 식재료가 없습니다.</div>
        )}
        <button className=' absolute left-20 bottom-20 z-20 bg-carrot px-20 py-12 text-white text-16 font-semibold rounded-full'>
          오늘 뭐 먹지?
        </button>
        <Link
          href={'/categories'}
          className=' absolute right-20 bottom-20 z-20 bg-carrot px-20 py-12 text-white text-16 font-semibold rounded-full'
        >
          +
        </Link>
      </main>
    </Layout>
  );
};

export default Home;
