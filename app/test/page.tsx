'use client';
import React, { useEffect, useRef } from 'react';
import Sortable from 'sortablejs';

const Test = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      Sortable.create(containerRef.current, {
        group: 'nested',
        animation: 150,
       
      });

      containerRef.current.querySelectorAll('.sortable').forEach((sortable) => {
        Sortable.create(sortable as HTMLElement, {
          animation: 150,
          group: 'nested',
        });
      });
    }
  }, []);

  return (
    <div ref={containerRef} className="sortable">
      <div >
        <div>Item 1</div>
        <div className="sortable">
        <div className='pl-2'>Sub Item 1.1</div>
        <div className='pl-2'>Sub Item 1.2</div>
        </div>
      </div>
      <div >
        <div>Item 2</div>
        <div className="sortable">
        <div className='pl-2'>Sub Item 2.1</div>
        <div className='pl-2'>Sub Item 2.2</div>
        </div>
      </div>
      <div >
        <div>Item 3</div>
        <div className="sortable">
            <div className='pl-2'>Sub Item 3.1</div>
            <div className='pl-2'>Sub Item 3.2</div>
        </div>
      </div>
    </div>
  );
};

export default Test;