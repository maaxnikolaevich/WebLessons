const structPage={
    listItem:{
        tag:'div',
        attr:'data-parent',
        class:'list-item',
        moreAttr:'list-item-open'
    },
    listItemInner:{
        tag:'div',
        class:'list-item__inner'
    },
    listItemItems:{
        tag:'div',
        class:'list-item__items'
    },
    imgArrow:{
        tag:'img',
        class:'list-item__arrow',
        src:'./assets/img/chevron-down.png',
        alt:'chevron-down',
        attr:'data-open'
    },
    imgFolder:{
        tag:'img',
        class:'list-item__folder',
        src:'./assets/img/folder.png',
        alt:'folder'
    }
}

export default class ListItems{
    constructor(el,data) {
        this.el=el;
        this.data=data;
        this.init();
    }
    init(){
        this.render();
        const parents=this.el.querySelectorAll('[data-parent]')
        if ( parents.length !== 0){
            parents.forEach(parent => {
                const open=parent.querySelector('[data-open]');
                open.addEventListener('click',()=>this.toggleItems(parent))
            })
        }
    }
    toggleItems(parent){
        parent.classList.toggle('list-item_open');
    }
    render(){
        this.renderParent(this.data)
    }
    
    renderParent(data) {
        let newSpan=document.createElement('span');
        let newItemElem=this.renderStructItem(structPage.listItem);
        let newInnerElem=this.renderStructItem(structPage.listItemInner);
        newSpan.innerHTML=data.name;
        if (data.hasChildren){
            newInnerElem.append(this.renderStructItem(structPage.imgArrow),this.renderStructItem(structPage.imgFolder),newSpan);
            newItemElem.append(newInnerElem);
            this.el.append(newItemElem);
            data.items.forEach(node=>{
                this.renderParent(node);
            });
        }   
        else
        {
            newInnerElem.append(this.renderStructItem(structPage.imgFolder),newSpan);
            newItemElem.append(newInnerElem);
            this.el.append(newItemElem);
        }
    }
    renderStructItem(structItem){
        let newItem=document.createElement(structItem.tag);
        newItem.className=structItem.class;
        if (structItem.moreAttr!==undefined) newItem.classList.add(structItem.moreAttr);
        if (structItem.tag === 'img'){
            newItem.src=structItem.src;
            newItem.alt=structItem.alt;
            return newItem
        }
        if (structItem.attr!==undefined) newItem.setAttribute(structItem.attr,'');
        return newItem
    }
} 