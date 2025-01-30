
"use client";

import React, { FC, useEffect, useState, useCallback, useRef } from "react";
import Sortable from "sortablejs";
import { createId } from '@paralleldrive/cuid2';
import { TreeContextMenu } from "./TreeContextMenu";
import clsx from 'clsx';
import axios from 'axios'
import { PageDto } from '../lib/dtos'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

interface TreeItemData {
  id: string;
  name: string;
  order: number;
  children?: TreeItemData[]
}

interface TreeItemState {
  isExpanded: boolean;
  isEditing: boolean;
}

interface TreeState {
  [id: string] : TreeItemState;
}

interface Props 
{ 
  disableScreen: (disable: boolean) => void; 
}

interface MovePageRequestDto {
  pageId: string;
  newParentPageId: string | undefined;
  newOrder: number | undefined;
}


interface RenamePageRequestDto {
  pageId: string;
  title: string | null;
}



export default function TreeView (props: Props) {
  const queryClient = useQueryClient()

  
  const [pages, setPages] = useState<PageDto[]>([]);
  const [selectedPage, setSelectedPage] = useState<string|undefined>(undefined);
  const [itemState, setItemState] = useState<TreeState>({});
  // const editTitleElement = useRef<HTMLInputElement>(null);
  
  const { isLoading, error, refetch } = useQuery({
    queryKey: ['getPages'],
    queryFn: async () => {
      const res = await axios.get<PageDto[]>('http://localhost:3000/api/pages');
      console.log("Query data...");
      return res.data;
    },
    onSuccess: (data) => {
      setPages(data);  
    }
  });

  async function refreshPages(){
    queryClient.invalidateQueries({ queryKey: ['getPages'] })
        
    const refetchedData = await refetch();
      
    // Manually update state after refetch
    if (refetchedData.data) {
      setPages(refetchedData.data);
    }
  }

  // ------------------------------------------------------------------
  // Map pages received from api to tree hierarchy that will be used 
  // to construct the treeview.
  // ------------------------------------------------------------------
  const mapRootPages = useCallback( (pagesToMap: PageDto[] | undefined) : TreeItemData[] => {
    if (pagesToMap === undefined){
      return [];
    }

    function mapChildrenPages(parentPageId: string | null, pages: PageDto[] | undefined ): TreeItemData[]{
      if (pages === undefined){
        return [];
      }
    
      return pages
        .filter(v => v.ParentPageId === parentPageId)
        .map<TreeItemData>(i => 
          ({
            id: i.Id,
            name: i.Title,
            order: i.Order,
            children: mapChildrenPages(i.Id, pages)
          }))
        .sort((a, b) => a.order - b.order);
    }
    
    return pagesToMap
      .filter(v => v.ParentPageId === null)
      .map<TreeItemData>(i => 
        ({
          id: i.Id,
          name: i.Title,
          order: i.Order,
          children: mapChildrenPages(i.Id, pagesToMap)
        }))
      .sort((a, b) => a.order - b.order);
  }, [pages]);

  // ------------------------------------------------------------------
  // Api call to add a new page
  // ------------------------------------------------------------------
  const addPageMutation = useMutation({
    mutationFn: async (newPage: PageDto) => 
      {
        props.disableScreen(true);
        return await axios.post('http://localhost:3000/api/pages', newPage)
      },
      async onSuccess(data, newPage, context) {
        // Update directly the state for faster ui update. A full refresh will be done after
        setPages(
          [
            ...pages,
            newPage
          ]);
        
        props.disableScreen(false);
        
        // Call the api to refresh the pages
        refreshPages();
        setSelectedPage(newPage.Id);
    },
    onError(error, variables, context) {
      props.disableScreen(false);
    },
  });

  const movePageMutation = useMutation({
    mutationFn: async (movePageRequest: MovePageRequestDto) => 
      {
        props.disableScreen(true);
        console.log(movePageRequest);
        return await axios.post('http://localhost:3000/api/movePage', movePageRequest);
      },
      async onSuccess(data, movePageRequest, context) {
        props.disableScreen(false);
        
        // Call the api to refresh the pages
        
        refreshPages();
        setSelectedPage(movePageRequest.pageId);
    },
    onError(error, movePageRequest, context) {
      props.disableScreen(false);
    },
  });

  const renamePageMutation = useMutation({
    mutationFn: async (renamePageRequest: RenamePageRequestDto) => 
      {
        props.disableScreen(true);
        const { pageId, ...renamePageRequestDto } = renamePageRequest;
        return await axios.patch(`http://localhost:3000/api/pages/${renamePageRequest.pageId}`, renamePageRequestDto);
      },
      async onSuccess(data, movePageRequest, context) {
        props.disableScreen(false);
        
        
        refreshPages();

        setSelectedPage(movePageRequest.pageId);
    },
    onError(error, movePageRequest, context) {
      props.disableScreen(false);
    },
  });

  // ------------------------------------------------------------------
  // Expand node in the tree view
  // ------------------------------------------------------------------
  function expandNode(pageId: string, isExpanded: boolean){
    setItemState(
      {
        ...itemState,
        [pageId]:{
          ...itemState[pageId],
          isExpanded: isExpanded 
        }
      });
  }

  function editTitleNode(pageId: string, isEditing: boolean){
    setItemState(
      {
        ...itemState,
        [pageId]:{
          ...itemState[pageId],
          isEditing: isEditing 
        }
      });
  }

  // ------------------------------------------------------------------
  // Create a new page and call api mto add it to the DB
  // ------------------------------------------------------------------
  function addPage(parentPageId: string){
    const newId = createId();
    const newPage = {
      Id: newId,
      ParentPageId: parentPageId,
      Title: "[Draft]",
      SpaceId: 0,
      State: 1,
      Order: 0
    };
    addPageMutation.mutate(newPage);
    expandNode(parentPageId, true);
  }

  function renamePage(pageId: string, title: string){
    const renamePageRequest = {
      pageId: pageId,
      title: title,
    };
    renamePageMutation.mutate(renamePageRequest);
  }
  // ------------------------------------------------------------------
  // Delete a page
  // ------------------------------------------------------------------
  const deletePageMutation = useMutation({
    mutationFn: async (pageId: string) => {
      props.disableScreen(true);
      editTitleNode(pageId, false);
      return await axios.delete(`http://localhost:3000/api/pages/${pageId}`);
    },
    async onSuccess(data, pageId, context) {
      props.disableScreen(false);
      //setPages(pages.filter(page => page.Id !== pageId));
      queryClient.invalidateQueries({ queryKey: ['getPages'] });
      refetch();
      setSelectedPage(undefined);
    },
    onError(error, variables, context) {
      props.disableScreen(false);
    },
  });

  function deletePage(pageId: string) {
    deletePageMutation.mutate(pageId);
  }

  // const [menuVisible, setMenuVisible] = useState<string | null>(null);

  // function toggleMenu(pageId: string) {
  //   setMenuVisible(menuVisible === pageId ? null : pageId);
  // }

  // function handleClickOutside(event: MouseEvent) {
  //   if (!(event.target as HTMLElement).closest('.menu')) {
  //     setMenuVisible(null);
  //   }
  // }

  // useEffect(() => {
  //   document.addEventListener('click', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('click', handleClickOutside);
  //   };
  // }, []);
  
  // ------------------------------------------------------------------
  // Component that represent a node in the tree view
  // ------------------------------------------------------------------
  let node = (treeItem: TreeItemData) => {
    const nodeOptions = [
      {
        name: 'Rename...',
        // TODO: when renaming, set page title editable in the tree and handle the change event to rename the page
        onClick: () => editTitleNode(treeItem.id, true)
      },
      {
        name: 'Delete',
        onClick: () => deletePage(treeItem.id)
      }
    ];


    return (
    <div className={clsx("pl-2 ", {
      "disable-sortable": itemState[treeItem.id]?.isEditing === true
    })} key={treeItem.id} title={treeItem.id + " " +treeItem.order} >
      <div className={clsx('flex flex-row items-center hover:bg-blue-100 group', {
        'hover:bg-blue-500 bg-blue-300': treeItem.id === selectedPage,
        '': treeItem.id !== selectedPage
      })} onClick={() => setSelectedPage(treeItem.id)} >
        <label>
          <input 
            id="link-checkbox" 
            type="checkbox" 
            value="" 
            className="hidden peer" 
            checked={!!itemState[treeItem.id]?.isExpanded}
            onChange={(e) => {
              setItemState(
              {
                ...itemState,
                [treeItem.id]:{
                  ...itemState[treeItem.id],
                  isExpanded: !itemState[treeItem.id]?.isExpanded 
                }
              });
            }
            }/>
          
          <svg className={clsx('w-3 h-3  shrink-0 ',
          {
            'rotate-180': itemState[treeItem.id]?.isExpanded,
            'rotate-90': !itemState[treeItem.id]?.isExpanded,
          })}  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            { treeItem.children !== undefined && treeItem.children.length > 0 && (
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>)
            }
            { treeItem.children === undefined || treeItem.children.length === 0 && (
              <circle cx="2" cy="2" r="2" fill="currentColor" />)
            }
          </svg>
        </label>
        <div className="px-1"/>
        
        {itemState[treeItem.id]?.isEditing ? (
          <input
            ref={(el) => {
              if (el) {
               // setTimeout(() => {
                  el.focus();
                  el.setSelectionRange(el.value.length, el.value.length);
              //  }, 0);                
              }
            }}
            className="edit-title"
            type="text"
            defaultValue={treeItem.name}
            onBlur={(e) => {
              renamePage(treeItem.id, e.target.value);
              editTitleNode(treeItem.id, false);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                renamePage(treeItem.id, e.currentTarget.value);
                editTitleNode(treeItem.id, false);
              }
            }}
            
          />
        ) : (
          <span className="grow truncate text-ellipsis"> {treeItem.name} </span>
        )}
        {/* Button '...' (context menu) */}
          <TreeContextMenu options={nodeOptions}>
            <button className="flex justify-center items-center hover:border-slate-300 hover:border-2 active:bg-slate-200 text-slate-400 rounded w-6 h-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-500 ease-in-out">
              <svg  className="w-4 h-4 p-0.5 fill-slate-600" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.055 32.055" >
                <g>
                  <path d="M3.968,12.061C1.775,12.061,0,13.835,0,16.027c0,2.192,1.773,3.967,3.968,3.967c2.189,0,3.966-1.772,3.966-3.967
                    C7.934,13.835,6.157,12.061,3.968,12.061z M16.233,12.061c-2.188,0-3.968,1.773-3.968,3.965c0,2.192,1.778,3.967,3.968,3.967
                    s3.97-1.772,3.97-3.967C20.201,13.835,18.423,12.061,16.233,12.061z M28.09,12.061c-2.192,0-3.969,1.774-3.969,3.967
                    c0,2.19,1.774,3.965,3.969,3.965c2.188,0,3.965-1.772,3.965-3.965S30.278,12.061,28.09,12.061z"/>
                </g>
              </svg>
            </button>
          </TreeContextMenu>
        {/* Button '+' (add page) */}
        <button className="
          hover:border-slate-300 hover:border-2 
          active:bg-slate-200 
          text-slate-400 
          rounded 
          w-6 h-6 
          flex justify-center items-center 
          opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-500 ease-in-out"
          onClick={e => addPage(treeItem.id)}>
          <svg className="w-4 h-4 p-0.5 fill-slate-600" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45.402 45.402">
          <g>
            <path d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141
              c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27
              c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435
              c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"/>
          </g>
          </svg>
        </button>
      </div>
      

      {treeItem.children !== undefined && treeItem.children.length > 0 && !!itemState[treeItem.id]?.isExpanded && (
        <div className="nested-sortable" data-page-id={treeItem.id} >{treeItem.children.map(c => node(c))}</div>
      )}
      
    </div>)
  };

  // Helper to update page order in the local state
  function updatePageOrder(pages: PageDto[], pageId: string | undefined, parentPageId: string | undefined, newIndex: number): PageDto[] {
    // Remove the page from its current position
    const pageToMove = pages.find(p => p.Id === pageId);
    const filteredPages = pages.filter(p => p.Id !== pageId);

    // Insert at the new position
    if (pageToMove) {
      pageToMove.ParentPageId = parentPageId ?? null;
      filteredPages.splice(newIndex, 0, pageToMove);
    }
    return filteredPages;
  }

  
  useEffect(() =>
    {
      //var nestedSortables: HTMLElement[] = Array.from(document.querySelectorAll('.nested-sortable'));
  
      // const editTitleElement = document.querySelector('.edit-title') as HTMLInputElement;
      // console.log('editElement: ' + editTitleElement);
      // editTitleElement?.focus();
      // editTitleElement?.setSelectionRange(0, editTitleElement.value.length);

      // Loop through each nested sortable element
      const nestedSortables = [].slice.call(document.querySelectorAll('.nested-sortable'));
      console.log("use effects: " + nestedSortables.map((sortable: HTMLElement) => sortable.title).join(', '));
      const sortableInstances = nestedSortables.map((sortableElement) => {
        



        return Sortable.create(sortableElement, {
          group: 'nested',
          animation: 150,
          fallbackOnBody: true,
          swapThreshold: 0.65,
          filter: '.disable-sortable',
          //handle: '.nested-sortable',
          //draggable: '.nested-sortable',
          preventOnFilter: false,
          onEnd(event) {
            

            // let movePageRequest: MovePageRequestDto = {
            //   pageId: event.item.title,
            //   newParentPageId: event.to.dataset.pageId,
            //   newOrder: event.newIndex
            // };
            // movePageMutation.mutate(movePageRequest);
            // console.log(event);



                // const movedPageId = event.item.dataset.pageId;
                // const newParentPageId = event.to.dataset.pageId;
                // const newIndex = event.newIndex;

                // // Update the local pages state immediately
                // const updatedPages = updatePageOrder(pages, movedPageId, newParentPageId, newIndex ?? 0);
                // setPages(updatedPages);

                // // Prepare the mutation request
                // let movePageRequest: MovePageRequestDto = {
                //   pageId: movedPageId ?? "",
                //   newParentPageId: newParentPageId,
                //   newOrder: newIndex
                // };

                // // Perform backend update
                // movePageMutation.mutate(movePageRequest);
              },
            });

            
           
      });

      
      return () => {
        console.log("destroy sortable: " + sortableInstances.map((sortable) => sortable.el.title).join(', '));
        sortableInstances.forEach(instance => instance.destroy());
      };

      
      

    }, [pages, itemState]);
  
    
    console.log("Reloading component");

  
  // const { isLoading, error, data, isFetching } = useQuery({ queryKey: ['getPages'], queryFn: () => axios
  //   .get<PageDto[]>('http://localhost:3000/api/pages')
  //   .then((res) => 
  //     {
  //       console.log("Query data...");
  //       setPages(res.data);
  //       return res.data;
  //     })});

  if (isLoading) {
     return 'Loading...'
  }

  if (error) { 
    return 'An error has occurred: ' + error 
  }

  let itemDatas = mapRootPages(pages);
  return (
        <div id="nestedDemo" className="col nested-sortable [&>*]:cursor-default">
          {itemDatas.map(c => node(c))}
      </div> 
  );


  
};