'use client';
import { useLayoutEffect } from 'react';
import { useEffect } from 'react';
import { HSAccordion, HSTreeView } from "preline/preline";
import Sortable from 'sortablejs'
import _ from 'lodash'


 export default function PageTreeView() {
    useEffect(() => {
        const draggable = document.querySelectorAll('[data-hs-nested-draggable]');
            
        draggable.forEach((el) => {
          const options = {
            group: 'nested',
            animation: 150,
            fallbackOnBody: true,
            swapThreshold: 0.65,
            ghostClass: 'dragged',
            onEnd: (evt) => {
              const { item } = evt;
  
              if (item.classList.contains('hs-accordion')) {
                let existingInstance = HSAccordion.getInstance(item, true);
                let updatedInstance;
  
                existingInstance.element.update();
                updatedInstance = HSAccordion.getInstance(item, true);
                window.$hsAccordionCollection.map((el) => {
                  if (
                    el.element.el !== existingInstance.element.el &&
                    el.element.group === existingInstance.element.group &&
                    el.element.el.classList.contains('active') &&
                    existingInstance.element.el.classList.contains('active')
                  ) el.element.hide();
  
                  return el;
                });
              }
  
              if (!!item.hasAttribute('data-hs-tree-view-item')) {
                const treeViewItem = HSTreeView.getInstance(item.closest('[data-hs-tree-view]'), true);
  
                treeViewItem.element.update();
              }
            },
          };
          const data = el.getAttribute('data-hs-nested-draggable');
          const dataOptions = data ? JSON.parse(data) : {};
          const sortable = new Sortable(el, _.merge(options, dataOptions));
        });
      }, []);
    
    
    return (
     <>
    <div id="hs-tree-view-nested" role="tree" aria-orientation="vertical" data-hs-tree-view="">
  <div data-hs-nested-draggable="">
    <div className="hs-accordion hs-dragged:bg-blue-100 hs-dragged:rounded nested-1 active" role="treeitem" aria-expanded="true" id="hs-draggable-tree-heading-one" data-hs-tree-view-item='{
      "value": "assets",
      "isDir": true
    }'>
      <div className="hs-accordion-heading py-0.5 rounded-md flex items-center gap-x-0.5 w-full hs-tree-view-selected:bg-gray-100 dark:hs-tree-view-selected:bg-neutral-700">
        <button className="hs-accordion-toggle size-6 flex justify-center items-center hover:bg-gray-100 rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" aria-expanded="true" aria-controls="hs-draggable-tree-collapse-one">
          <svg className="size-4 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"></path>
            <path className="hs-accordion-active:hidden block" d="M12 5v14"></path>
          </svg>
        </button>

        <div className="grow hs-tree-view-selected:bg-gray-100 dark:hs-tree-view-selected:bg-neutral-700 px-1.5 rounded-md cursor-pointer">
          <div className="flex items-center gap-x-3">
            <svg className="shrink-0 size-4 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"></path>
            </svg>
            <div className="grow">
              <span className="text-sm text-gray-800 dark:text-neutral-200">
                assets
              </span>
            </div>
          </div>
        </div>
      </div>

      <div id="hs-draggable-tree-collapse-one" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300" role="group" aria-labelledby="hs-draggable-tree-heading-one">
        <div className="ps-7 relative before:absolute before:top-0 before:start-3 before:w-0.5 before:-ms-px before:h-full before:bg-gray-100 dark:before:bg-neutral-700" data-hs-nested-draggable="">
          <div className="hs-accordion hs-dragged:bg-blue-100 hs-dragged:rounded nested-2 active" role="treeitem" aria-expanded="true" id="hs-draggable-tree-sub-heading-one" data-hs-tree-view-item='{
            "value": "css",
            "isDir": true
          }'>
            <div className="hs-accordion-heading py-0.5 rounded-md flex items-center gap-x-0.5 w-full hs-tree-view-selected:bg-gray-100 dark:hs-tree-view-selected:bg-neutral-700">
              <button className="hs-accordion-toggle size-6 flex justify-center items-center hover:bg-gray-100 rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" aria-expanded="true" aria-controls="hs-draggable-tree-sub-collapse-one">
                <svg className="size-4 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path className="hs-accordion-active:hidden block" d="M12 5v14"></path>
                </svg>
              </button>

              <div className="grow hs-tree-view-selected:bg-gray-100 dark:hs-tree-view-selected:bg-neutral-700 px-1.5 rounded-md cursor-pointer">
                <div className="flex items-center gap-x-3">
                  <svg className="shrink-0 size-4 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"></path>
                  </svg>
                  <div className="grow">
                    <span className="text-sm text-gray-800 dark:text-neutral-200">
                      css
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div id="hs-draggable-tree-sub-collapse-one" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300" role="group" aria-labelledby="hs-draggable-tree-sub-heading-one">
              <div className="ps-7 relative before:absolute before:top-0 before:start-3 before:w-0.5 before:-ms-px before:h-full before:bg-gray-100 dark:before:bg-neutral-700" data-hs-nested-draggable="">
                <div className="hs-accordion hs-dragged:bg-blue-100 hs-dragged:rounded nested-3 active" role="treeitem" aria-expanded="true" id="hs-draggable-tree-sub-level-two-heading-one" data-hs-tree-view-item='{
                  "value": "main",
                  "isDir": true
                }'>
                  <div className="hs-accordion-heading py-0.5 rounded-md flex items-center gap-x-0.5 w-full hs-tree-view-selected:bg-gray-100 dark:hs-tree-view-selected:bg-neutral-700">
                    <button className="hs-accordion-toggle size-6 flex justify-center items-center hover:bg-gray-100 rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" aria-expanded="true" aria-controls="hs-draggable-tree-sub-level-two-collapse-one">
                      <svg className="size-4 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"></path>
                        <path className="hs-accordion-active:hidden block" d="M12 5v14"></path>
                      </svg>
                    </button>

                    <div className="grow hs-tree-view-selected:bg-gray-100 dark:hs-tree-view-selected:bg-neutral-700 px-1.5 rounded-md cursor-pointer">
                      <div className="flex items-center gap-x-3">
                        <svg className="shrink-0 size-4 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"></path>
                        </svg>
                        <div className="grow">
                          <span className="text-sm text-gray-800 dark:text-neutral-200">
                            main
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div id="hs-draggable-tree-sub-level-two-collapse-one" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300" role="group" aria-labelledby="hs-draggable-tree-sub-level-two-heading-one">
                    <div className="ms-3 ps-3 relative before:absolute before:top-0 before:start-0 before:w-0.5 before:-ms-px before:h-full before:bg-gray-100 dark:before:bg-neutral-700" data-hs-nested-draggable="">
                      <div className="hs-tree-view-selected:bg-gray-100 dark:hs-tree-view-selected:bg-neutral-700 px-2 rounded-md cursor-pointer hs-dragged:bg-blue-100 hs-dragged:rounded nested-4" role="treeitem" data-hs-tree-view-item='{
                        "value": "main.css",
                        "isDir": false
                      }'>
                        <div className="flex items-center gap-x-3">
                          <svg className="shrink-0 size-4 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                            <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                          </svg>
                          <div className="grow">
                            <span className="text-sm text-gray-800 dark:text-neutral-200">
                              main.css
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="hs-tree-view-selected:bg-gray-100 dark:hs-tree-view-selected:bg-neutral-700 px-2 rounded-md cursor-pointer hs-dragged:bg-blue-100 hs-dragged:rounded nested-4" role="treeitem" data-hs-tree-view-item='{
                        "value": "docs.css",
                        "isDir": false
                      }'>
                        <div className="flex items-center gap-x-3">
                          <svg className="shrink-0 size-4 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                            <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                          </svg>
                          <div className="grow">
                            <span className="text-sm text-gray-800 dark:text-neutral-200">
                              docs.css
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="px-2 hs-tree-view-selected:bg-gray-100 dark:hs-tree-view-selected:bg-neutral-700 hs-dragged:bg-blue-100 hs-dragged:rounded nested-4 hs-tree-view-disabled:opacity-50 disabled" data-hs-tree-view-item='{
                        "value": "README.txt",
                        "isDir": false
                      }'>
                        <span className="text-sm text-gray-800 dark:text-neutral-200">
                          README.txt
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hs-accordion hs-dragged:bg-blue-100 hs-dragged:rounded nested-3" role="treeitem" aria-expanded="false" id="hs-draggable-tree-sub-level-two-heading-two" data-hs-tree-view-item='{
                  "value": "tailwind",
                  "isDir": true
                }'>
                  <div className="hs-accordion-heading py-0.5 rounded-md flex items-center gap-x-0.5 w-full hs-tree-view-selected:bg-gray-100 dark:hs-tree-view-selected:bg-neutral-700">
                    <button className="hs-accordion-toggle size-6 flex justify-center items-center hover:bg-gray-100 rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" aria-expanded="false" aria-controls="hs-draggable-tree-sub-level-two-collapse-two">
                      <svg className="size-4 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"></path>
                        <path className="hs-accordion-active:hidden block" d="M12 5v14"></path>
                      </svg>
                    </button>

                    <div className="grow hs-tree-view-selected:bg-gray-100 dark:hs-tree-view-selected:bg-neutral-700 px-1.5 rounded-md cursor-pointer">
                      <div className="flex items-center gap-x-3">
                        <svg className="shrink-0 size-4 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"></path>
                        </svg>
                        <div className="grow">
                          <span className="text-sm text-gray-800 dark:text-neutral-200">
                            tailwind
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div id="hs-draggable-tree-sub-level-two-collapse-two" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="group" aria-labelledby="hs-draggable-tree-sub-level-two-heading-two">
                    <div className="ms-3 ps-3 relative before:absolute before:top-0 before:start-0 before:w-0.5 before:-ms-px before:h-full before:bg-gray-100 dark:before:bg-neutral-700" data-hs-nested-draggable="">
                      <div className="hs-tree-view-selected:bg-gray-100 dark:hs-tree-view-selected:bg-neutral-700 px-2 rounded-md cursor-pointer hs-dragged:bg-blue-100 hs-dragged:rounded nested-4" role="treeitem" data-hs-tree-view-item='{
                        "value": "input.css",
                        "isDir": false
                      }'>
                        <div className="flex items-center gap-x-3">
                          <svg className="shrink-0 size-4 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                            <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                          </svg>
                          <div className="grow">
                            <span className="text-sm text-gray-800 dark:text-neutral-200">
                              input.css
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="py-0.5 px-1.5 rounded-md hs-tree-view-selected:bg-gray-100 dark:hs-tree-view-selected:bg-neutral-700 hs-dragged:bg-blue-100 hs-dragged:rounded nested-3" role="treeitem" data-hs-tree-view-item='{
                  "value": ".gitignore",
                  "isDir": false
                }'>
                  <span className="text-sm text-gray-800 dark:text-neutral-200">
                    .gitignore
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="hs-accordion hs-dragged:bg-blue-100 hs-dragged:rounded nested-2" role="treeitem" aria-expanded="false" id="hs-draggable-tree-sub-heading-two" data-hs-tree-view-item='{
            "value": "img",
            "isDir": true
          }'>
            <div className="hs-accordion-heading py-0.5 rounded-md flex items-center gap-x-0.5 w-full hs-tree-view-selected:bg-gray-100 dark:hs-tree-view-selected:bg-neutral-700">
              <button className="hs-accordion-toggle size-6 flex justify-center items-center hover:bg-gray-100 rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" aria-expanded="false" aria-controls="hs-draggable-tree-sub-collapse-two">
                <svg className="size-4 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path className="hs-accordion-active:hidden block" d="M12 5v14"></path>
                </svg>
              </button>

              <div className="grow hs-tree-view-selected:bg-gray-100 dark:hs-tree-view-selected:bg-neutral-700 px-1.5 rounded-md cursor-pointer">
                <div className="flex items-center gap-x-3">
                  <svg className="shrink-0 size-4 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"></path>
                  </svg>
                  <div className="grow">
                    <span className="text-sm text-gray-800 dark:text-neutral-200">
                      img
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div id="hs-draggable-tree-sub-collapse-two" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="group" aria-labelledby="hs-draggable-tree-sub-heading-two">
              <div className="ms-3 ps-3 relative before:absolute before:top-0 before:start-0 before:w-0.5 before:-ms-px before:h-full before:bg-gray-100 dark:before:bg-neutral-700" data-hs-nested-draggable="">
                <div className="hs-tree-view-selected:bg-gray-100 dark:hs-tree-view-selected:bg-neutral-700 px-2 rounded-md cursor-pointer hs-dragged:bg-blue-100 hs-dragged:rounded nested-3" role="treeitem" data-hs-tree-view-item='{
                  "value": "hero.jpg",
                  "isDir": false
                }'>
                  <div className="flex items-center gap-x-3">
                    <svg className="shrink-0 size-4 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                      <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                      <circle cx="10" cy="12" r="2"></circle>
                      <path d="m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22"></path>
                    </svg>
                    <div className="grow">
                      <span className="text-sm text-gray-800 dark:text-neutral-200">
                        hero.jpg
                      </span>
                    </div>
                  </div>
                </div>

                <div className="hs-tree-view-selected:bg-gray-100 dark:hs-tree-view-selected:bg-neutral-700 px-2 rounded-md cursor-pointer hs-dragged:bg-blue-100 hs-dragged:rounded nested-3" role="treeitem" data-hs-tree-view-item='{
                  "value": "tailwind.png",
                  "isDir": false
                }'>
                  <div className="flex items-center gap-x-3">
                    <svg className="shrink-0 size-4 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                      <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                      <circle cx="10" cy="12" r="2"></circle>
                      <path d="m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22"></path>
                    </svg>
                    <div className="grow">
                      <span className="text-sm text-gray-800 dark:text-neutral-200">
                        tailwind.png
                      </span>
                    </div>
                  </div>
                </div>

                <div className="hs-tree-view-selected:bg-gray-100 dark:hs-tree-view-selected:bg-neutral-700 px-2 rounded-md cursor-pointer hs-dragged:bg-blue-100 hs-dragged:rounded nested-3" role="treeitem" data-hs-tree-view-item='{
                  "value": "untitled.png",
                  "isDir": false
                }'>
                  <div className="flex items-center gap-x-3">
                    <svg className="shrink-0 size-4 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                      <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                      <circle cx="10" cy="12" r="2"></circle>
                      <path d="m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22"></path>
                    </svg>
                    <div className="grow">
                      <span className="text-sm text-gray-800 dark:text-neutral-200">
                        untitled.png
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hs-accordion hs-dragged:bg-blue-100 hs-dragged:rounded nested-2" role="treeitem" aria-expanded="false" id="hs-draggable-tree-sub-heading-three" data-hs-tree-view-item='{
            "value": "js",
            "isDir": true
          }'>
            <div className="hs-accordion-heading py-0.5 rounded-md flex items-center gap-x-0.5 w-full hs-tree-view-selected:bg-gray-100 dark:hs-tree-view-selected:bg-neutral-700">
              <button className="hs-accordion-toggle size-6 flex justify-center items-center hover:bg-gray-100 rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" aria-expanded="false" aria-controls="hs-draggable-tree-sub-collapse-three">
                <svg className="size-4 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path className="hs-accordion-active:hidden block" d="M12 5v14"></path>
                </svg>
              </button>

              <div className="grow hs-tree-view-selected:bg-gray-100 dark:hs-tree-view-selected:bg-neutral-700 px-1.5 rounded-md cursor-pointer">
                <div className="flex items-center gap-x-3">
                  <svg className="shrink-0 size-4 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"></path>
                  </svg>
                  <div className="grow">
                    <span className="text-sm text-gray-800 dark:text-neutral-200">
                      js
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div id="hs-draggable-tree-sub-collapse-three" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="group" aria-labelledby="hs-draggable-tree-sub-heading-three">
              <div className="ms-3 ps-3 relative before:absolute before:top-0 before:start-0 before:w-0.5 before:-ms-px before:h-full before:bg-gray-100 dark:before:bg-neutral-700" data-hs-nested-draggable="">
                <div className="hs-tree-view-selected:bg-gray-100 dark:hs-tree-view-selected:bg-neutral-700 px-2 rounded-md cursor-pointer hs-dragged:bg-blue-100 hs-dragged:rounded nested-3" role="treeitem" data-hs-tree-view-item='{
                  "value": "preline.jpg",
                  "isDir": false
                }'>
                  <div className="flex items-center gap-x-3">
                    <svg className="shrink-0 size-4 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                      <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                      <circle cx="10" cy="12" r="2"></circle>
                      <path d="m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22"></path>
                    </svg>
                    <div className="grow">
                      <span className="text-sm text-gray-800 dark:text-neutral-200">
                        preline.jpg
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="hs-accordion hs-dragged:bg-blue-100 hs-dragged:rounded nested-1" role="treeitem" aria-expanded="false" id="hs-draggable-tree-heading-two" data-hs-tree-view-item='{
      "value": "scripts",
      "isDir": true
    }'>
      <div className="hs-accordion-heading py-0.5 rounded-md flex items-center gap-x-0.5 w-full hs-tree-view-selected:bg-gray-100 dark:hs-tree-view-selected:bg-neutral-700">
        <button className="hs-accordion-toggle size-6 flex justify-center items-center hover:bg-gray-100 rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" aria-expanded="false" aria-controls="hs-draggable-tree-collapse-two">
          <svg className="size-4 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"></path>
            <path className="hs-accordion-active:hidden block" d="M12 5v14"></path>
          </svg>
        </button>

        <div className="grow hs-tree-view-selected:bg-gray-100 dark:hs-tree-view-selected:bg-neutral-700 px-1.5 rounded-md cursor-pointer">
          <div className="flex items-center gap-x-3">
            <svg className="shrink-0 size-4 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"></path>
            </svg>
            <div className="grow">
              <span className="text-sm text-gray-800 dark:text-neutral-200">
                scripts
              </span>
            </div>
          </div>
        </div>
      </div>

      <div id="hs-draggable-tree-collapse-two" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="group" aria-labelledby="hs-draggable-tree-heading-two">
        <div className="ms-3 ps-3 relative before:absolute before:top-0 before:start-0 before:w-0.5 before:-ms-px before:h-full before:bg-gray-100 dark:before:bg-neutral-700" data-hs-nested-draggable="">
          <div className="hs-tree-view-selected:bg-gray-100 dark:hs-tree-view-selected:bg-neutral-700 px-2 rounded-md cursor-pointer hs-dragged:bg-blue-100 hs-dragged:rounded nested-2" role="treeitem" data-hs-tree-view-item='{
            "value": "preline.js",
            "isDir": false
          }'>
            <div className="flex items-center gap-x-3">
              <svg className="shrink-0 size-4 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
              </svg>
              <div className="grow">
                <span className="text-sm text-gray-800 dark:text-neutral-200">
                  preline.js
                </span>
              </div>
            </div>
          </div>

          <div className="hs-tree-view-selected:bg-gray-100 dark:hs-tree-view-selected:bg-neutral-700 px-2 rounded-md cursor-pointer hs-dragged:bg-blue-100 hs-dragged:rounded nested-2" role="treeitem" data-hs-tree-view-item='{
            "value": "tailwind.js",
            "isDir": false
          }'>
            <div className="flex items-center gap-x-3">
              <svg className="shrink-0 size-4 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
              </svg>
              <div className="grow">
                <span className="text-sm text-gray-800 dark:text-neutral-200">
                  tailwind.js
                </span>
              </div>
            </div>
          </div>

          <div className="hs-tree-view-selected:bg-gray-100 dark:hs-tree-view-selected:bg-neutral-700 px-2 rounded-md cursor-pointer hs-dragged:bg-blue-100 hs-dragged:rounded nested-2" role="treeitem" data-hs-tree-view-item='{
            "value": "www.js",
            "isDir": false
          }'>
            <div className="flex items-center gap-x-3">
              <svg className="shrink-0 size-4 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
              </svg>
              <div className="grow">
                <span className="text-sm text-gray-800 dark:text-neutral-200">
                  www.js
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="hs-accordion hs-dragged:bg-blue-100 hs-dragged:rounded hs-dragged:bg-blue-100 hs-dragged:rounded nested-1 hs-tree-view-disabled:opacity-50 disabled" role="treeitem" aria-expanded="false" id="hs-draggable-tree-heading-three" data-hs-tree-view-item='{
      "value": "templates",
      "isDir": true
    }'>
      <div className="hs-accordion-heading py-0.5 rounded-md flex items-center gap-x-0.5 w-full hs-tree-view-selected:bg-gray-100 dark:hs-tree-view-selected:bg-neutral-700">
        <button className="hs-accordion-toggle size-6 flex justify-center items-center hover:bg-gray-100 rounded-md focus:outline-none focus:bg-gray-100 hs-tree-view-disabled:pointer-events-none dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" disabled="" aria-expanded="false" aria-controls="hs-draggable-tree-collapse-three">
          <svg className="size-4 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"></path>
            <path className="hs-accordion-active:hidden block" d="M12 5v14"></path>
          </svg>
        </button>

        <div className="grow hs-tree-view-selected:bg-gray-100 dark:hs-tree-view-selected:bg-neutral-700 px-1.5 rounded-md cursor-pointer">
          <div className="flex items-center gap-x-3">
            <svg className="shrink-0 size-4 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"></path>
            </svg>
            <div className="grow">
              <span className="text-sm text-gray-800 dark:text-neutral-200">
                templates
              </span>
            </div>
          </div>
        </div>
      </div>

      <div id="hs-draggable-tree-collapse-three" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="group" aria-labelledby="hs-draggable-tree-heading-three">
        <div className="ms-3 ps-3 relative before:absolute before:top-0 before:start-0 before:w-0.5 before:-ms-px before:h-full before:bg-gray-100 dark:before:bg-neutral-700" data-hs-nested-draggable="">
          <div className="hs-tree-view-selected:bg-gray-100 dark:hs-tree-view-selected:bg-neutral-700 px-2 rounded-md cursor-pointer hs-dragged:bg-blue-100 hs-dragged:rounded nested-2" role="treeitem" data-hs-tree-view-item='{
            "value": "index.html",
            "isDir": false
          }'>
            <div className="flex items-center gap-x-3">
              <svg className="shrink-0 size-4 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
              </svg>
              <div className="grow">
                <span className="text-sm text-gray-800 dark:text-neutral-200">
                  index.html
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


    
    </>
    );
  }
