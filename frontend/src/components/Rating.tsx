'use client'
import React, { useState } from 'react';
import styled from 'styled-components';
import { Star } from 'lucide-react';
import axios from 'axios';

interface StarWrapperProps {
    $active: boolean;
  }
  
const StarWrapper = styled.button<StarWrapperProps>`
  font-size: 1rem;
  cursor: pointer;
  display: inline-block;
  transition: color 0.2s;
  color: ${(props) => (props.$active ? '#FFD700' : '#C0C0C0')};
`;

const Rating = ({data, review}:{data:any, review:any}) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [customReview, setCustomReview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const options = [
    'Pelayanan ramah',
    'Proses cepat',
    'Harganya murah',
    'Auto sigma coy',
    'Puas banget topup disini',
    'Custom',
  ];

  const handleOptionClick = (option:string) => {
    setSelectedOption(option);
    if (option !== 'Custom') {
      setCustomReview(option);
    } else {
      setCustomReview('');
    }
  };
  
  const handleCustomChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setCustomReview(e.target.value);
  };

  async function handleSubmit () {
        setIsLoading(true);
        const form = {
            no_invoice: data.no_refid,
            product_name: data.produk,
            item_name: data.item,
            nomor: data.nomor_whatsapp,
            rating: rating,
            comment: customReview,
        }
        try {
            if(customReview !== '' && rating !== 0) {
                const res = await axios.post(`${API_URL}/review`, form);
                if(res.data) {
                    window.location.reload();
                }                
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }        
  }

  return (
      <>
        {review ? (
          <div>
            <h1>Ulasan kamu</h1>
            <div className='mt-5 flex text-xs items-center'>
              {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                  <Star
                    size={18}
                    key={index}
                    fill={index <= review.rating ? '#FFD700' : 'none'}
                    stroke={index <= review.rating ? '#FFD700' : '#C0C0C0'}
                  />
                );
              })}
            </div>
            <p className='text-murky-20 mt-1 space-y-6 text-xs italic'>"{review.comment}"</p>
          </div>
        ): (
          <form className="border flex flex-col gap-y-3 rounded-lg border p-4">
          <div className="font-semibold">Tinggalkan ulasan untuk transaksi ini.</div>
          <div className="flex items-center">
            <div>
            {[...Array(5)].map((star, index) => {
                  index += 1;
                  return (
                      <StarWrapper
                          key={index}
                          $active={index <= (hover || rating)}
                          onClick={() => setRating(index)}
                          type='button'
                          onMouseEnter={() => setHover(index)}
                          onMouseLeave={() => setHover(rating)}
                      >
                          <Star fill={index <= (hover || rating) ? '#FFD700' : 'none'}
                              stroke={index <= (hover || rating) ? '#FFD700' : '#C0C0C0'} />
                      </StarWrapper>
                  );
              })}
            </div>
          </div>
          <div>
              <label htmlFor="" className="flex items-center justify-between text-sm font-medium leading-6 text-foreground">Tambahkan ulasan Anda</label>
              <div className='my-2 flex flex-wrap gap-1'>
              {options.map((option) => (
                <button type='button' key={option}
                    className={`ring-murky-700 inline-flex items-center gap-x-1.5 rounded-full px-3 py-2 text-xs font-medium text-foreground  ${
                    selectedOption === option
                    ? 'bg-green-500'
                    : 'bg-gray-700 hover:bg-green-500'
                }`}
                onClick={() => handleOptionClick(option)}
                >
                    <span className='pointer'>
                    {option}
                    </span>
                </button>
                ))}
              </div>
              {selectedOption === 'Custom' && (
                <textarea
                    className="w-full h-24 p-2 rounded-md bg-gray-700 text-white resize-none"
                    value={customReview}
                    onChange={handleCustomChange}
                    placeholder="Tulis ulasan kamu disini ..."
                />
            )}
          </div>
          <div className="flex-shrink-0">
              <button onClick={handleSubmit} disabled={isLoading} type='button' className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground duration-300 hover:bg-primary/75 disabled:cursor-not-allowed disabled:opacity-75">{isLoading ? 'Loading...' : 'Kirim'}</button>
          </div>
      </form>
        )}
      </>
  );
};

export default Rating;
