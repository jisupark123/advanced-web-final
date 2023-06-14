import Layout from '@/components/layout';
import { formatDate, extractDateFromString, setTimezoneTo6AM } from '@/lib/utils';
import AppResponseType from '@/types/appResponseType';
import { CategoryType, categoryList } from '@/types/categoryType';
import StorageArea, { storageAreaMapping } from '@/types/storageAreaType';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';

type Mode = 'new' | 'edit';

const Ingredient = () => {
  const router = useRouter();
  const { mode, name, category, id, expirationDate, count } = router.query;
  console.log(expirationDate);
  const currMode: Mode = mode ? (mode as Mode) : 'new';
  const [ingredientCount, setIngredientCount] = useState(currMode === 'new' ? 1 : Number(count)); // 수량

  const formState = {
    name: useRef<HTMLInputElement | null>(null),
    category: useRef<HTMLSelectElement | null>(null),
    storageArea: useRef<HTMLSelectElement | null>(null),
    expirationDate: useRef<HTMLInputElement | null>(null),
  };

  async function onSubmit() {
    const _name = formState.name.current?.value.trim();
    const _category = formState.category.current!.value.trim();
    const _storageArea = formState.storageArea.current!.value;
    const _expirationDate = formState.expirationDate.current?.value;

    if (typeof _name !== 'string' || _name?.length === 0) {
      alert('이름을 입력하세요');
      return;
    }

    if (!_expirationDate) {
      alert('날짜를 입력하세요');
      return;
    }

    if (currMode === 'new') {
      await fetchNewIngredient(_name, _category, _storageArea, _expirationDate);
    } else {
      await fetchEditIngredient(_name, _category, _storageArea, _expirationDate);
    }
  }

  async function fetchNewIngredient(name: string, category: string, storageArea: string, expirationDate: string) {
    try {
      const response = await axios.post<AppResponseType<null>>(
        'http://localhost:3001/api/ingredients',
        {
          name,
          category,
          storageArea,
          count: ingredientCount,
          expirationDate: setTimezoneTo6AM(expirationDate),
        },
        {
          headers: {
            jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzIiwiaWF0IjoxNjg2NzM5MTU5LCJleHAiOjE2ODkzMzExNTl9.xmnZ7j08eUNGJybs4wUXyjJID5ahkStIHHkoTo8MjfI',
          },
        }
      );
      if (response.status === 200) {
        alert('성공적으로 추가되었습니다');
        router.back();
      }
    } catch {}
  }

  async function fetchEditIngredient(name: string, category: string, storageArea: string, expirationDate: string) {
    try {
      const response = await axios.put<AppResponseType<null>>(
        'http://localhost:3001/api/ingredients',
        {
          id: Number(id),
          name,
          category,
          storageArea,
          count: ingredientCount,
          expirationDate: setTimezoneTo6AM(expirationDate),
        },
        {
          headers: {
            jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzIiwiaWF0IjoxNjg2NzM5MTU5LCJleHAiOjE2ODkzMzExNTl9.xmnZ7j08eUNGJybs4wUXyjJID5ahkStIHHkoTo8MjfI',
          },
        }
      );
      if (response.status === 200) {
        alert('성공적으로 수정되었습니다');
        router.back();
      }
    } catch {}
  }

  async function fetchDeleteIngredient() {
    try {
      const response = await axios.delete<AppResponseType<null>>('http://localhost:3001/api/ingredients', {
        headers: {
          jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzIiwiaWF0IjoxNjg2NzM5MTU5LCJleHAiOjE2ODkzMzExNTl9.xmnZ7j08eUNGJybs4wUXyjJID5ahkStIHHkoTo8MjfI',
          id: Number(id),
        },
      });
      if (response.status === 200) {
        alert('성공적으로 삭제되었습니다');
        router.back();
      }
    } catch {}
  }

  return (
    <Layout
      toolbar={{
        title: '재료 등록',
        hasBackBtn: true,
        rightBtn: {
          item:
            currMode === 'edit' ? (
              <button onClick={fetchDeleteIngredient}>
                <Image src={'/icons/trash.png'} alt='휴지통 아이콘' width={26} height={26} />
              </button>
            ) : undefined,
        },
      }}
    >
      <main className=' pt-100 px-20'>
        <form className='flex flex-col gap-10 items-center'>
          <div className='flex justify-center items-center gap-20'>
            <div>식재료명</div>
            <input
              type='text'
              ref={formState.name}
              defaultValue={typeof name === 'string' ? name : ''}
              className=' text-center bg-[#EDEDED] py-5 px-10 rounded-10'
            />
          </div>
          <div className='flex justify-center items-center gap-20'>
            <div>카테고리</div>
            <select
              ref={formState.category}
              className='w-[197px] align-middle bg-[#DEDEDE] py-5 px-10 rounded-5'
              defaultValue={category}
            >
              {Object.keys(categoryList).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className='flex justify-center items-center gap-20'>
            <div>보관장소</div>
            <select ref={formState.storageArea} className='w-[197px] align-middle bg-[#DEDEDE] py-5 px-10 rounded-5'>
              <option value={'freezer'}>냉동실</option>
              <option value={'fridge'}>냉장고</option>
              <option value={'roomTemp'}>실온</option>
            </select>
          </div>
          <div className='flex w-full justify-center items-center gap-20'>
            <div>수량</div>
            <div className='flex w-197 justify-center items-center gap-40'>
              <div
                className=' px-7 bg-[#DEDEDE] rounded-full cursor-pointer'
                onClick={() => setIngredientCount((prev) => prev + 1)}
              >
                +
              </div>
              <div>{ingredientCount}</div>
              <div
                className=' px-7 bg-[#DEDEDE] rounded-full cursor-pointer'
                onClick={() => {
                  if (ingredientCount > 1) {
                    setIngredientCount((prev) => prev - 1);
                  }
                }}
              >
                -
              </div>
            </div>
          </div>
          <div className=' flex justify-center items-center gap-20 mb-70'>
            <div>유통기한</div>
            <input
              type='date'
              ref={formState.expirationDate}
              // defaultValue={formatDateTimeString(expirationDate as string)}
              defaultValue={
                currMode === 'new' ? formatDate(new Date()) : extractDateFromString(expirationDate as string)
              }
              className='w-[180px] text-center bg-[#EDEDED] py-5 px-10 rounded-10'
            />
          </div>
        </form>
        <button className='w-full bg-carrot py-5 text-white rounded-full' onClick={onSubmit}>
          {currMode === 'new' ? '추가' : '수정'}
        </button>
      </main>
    </Layout>
  );
};

export default Ingredient;
