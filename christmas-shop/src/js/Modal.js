export class Modal {
  constructor(attributes) {
    // console.log(attributes);
    this.path = attributes.path;
    this.name = attributes.name;
    this.description = attributes.description;
    this.category = attributes.category;
    this.live = attributes.live;
    this.create = attributes.create;
    this.love = attributes.love;
    this.dream = attributes.dream;

    this.overlay = '';
    this.modal = '';
    this.modalCloseBtn = '';
    this.modalCloseLine = '';
    this.modalImage = '';
    this.modalContent = '';
    this.modalContentCategory = '';
    this.modalContentName = '';
    this.modalContentDescription = '';
    this.modalContentHeader = '';
    this.modalContentLive = '';
    this.modalContentCreate = '';
    this.modalContentLove = '';
    this.modalContentDream = '';
    this.modalContentLabel = '';
    this.modalContentBlock = '';
    this.modalContentBlockSpan = '';
    this.modalContentBlockLabel = '';
    this.modalContentBlockLive = '';
    this.modalContentBlockCreate = '';
    this.modalContentBlockLove = '';
    this.modalContentBlockDream = '';

  }

  generateModal() {

    // Overlay
    this.overlay = this.createDomNode(this.overlay, 'div', 'overlay');
    this.overlay.addEventListener('click', (e) => this.closeModal(e.target));

    // Modal window
    this.modal = this.createDomNode(this.modal, 'div', 'modal');

    //Close button
    this.modalCloseBtn = this.createDomNode(this.modalCloseBtn, 'div', 'modal__close-btn');
    this.modalCloseLine = this.createDomNode(this.modalCloseLine, 'span', 'modal__close-line');
    this.modalCloseBtn.addEventListener('click', (e) => this.closeModal(e.target));

    // Image
    this.modalImage = this.createDomNode(this.modalImage, 'span', `modal__image ${this.category.toLowerCase().replace('for ', '')}`);
    // this.modalImage.setAttribute('src', this.path);
    // this.modalImage.setAttribute('alt', 'gift image');

    // Content container
    this.modalContent = this.createDomNode(this.modalContent, 'div', 'modal__content');

    // Category
    if (this.category === "For Work")
      this.modalContentCategory = this.createDomNode(this.modalContentCategory, 'h5', 'h5--blue');
    else if (this.category === "For Health")
      this.modalContentCategory = this.createDomNode(this.modalContentCategory, 'h5', 'h5--green');
    else
      this.modalContentCategory = this.createDomNode(this.modalContentCategory, 'h5', 'h5--pink');
    this.modalContentCategory.innerText = this.category;

    // Name
    this.modalContentName = this.createDomNode(this.modalContentName, 'h4', 'contentName');
    this.modalContentName.innerText = this.name;

    // Description
    this.modalContentDescription = this.createDomNode(this.modalContentDescription, 'p',);
    this.modalContentDescription.innerText = this.description;

    //Label block

    this.modalContentLabel = this.createDomNode(this.modalContentName, 'h5', 'contentBlocksLabel');
    this.modalContentLabel.innerText = "Adds superpowers to:";

    //Live block
    this.modalContentBlockLive = this.ContentBlockConstructor(this.modalContentBlockLive, 'modalContentBlock', 'Live');

    //Create block
    this.modalContentBlockCreate = this.ContentBlockConstructor(this.modalContentBlockLive, 'modalContentBlock', 'Create');

    //Love block
    this.modalContentBlockLove = this.ContentBlockConstructor(this.modalContentBlockLive, 'modalContentBlock', 'Love');

    //Dream block
    this.modalContentBlockDream = this.ContentBlockConstructor(this.modalContentBlockLive, 'modalContentBlock', 'Dream');

    // Сборка модалки
    this.appendModalElements();

    // Добавляем на страницу
    this.openModal();
  }

  createDomNode(node, element, ...classes) {
    node = document.createElement(element);
    node.className = [...classes];
    return node;
  };

  ContentBlockConstructor(node, classes, mark) {
    node = document.createElement('div');
    node.className = classes;

    this.modalContentBlockLabel = document.createElement('p');
    this.modalContentBlockLabel.innerText = mark;
    this.modalContentBlockLabel.classList = 'modal-description-label';
    node.append(this.modalContentBlockLabel);

    // this.modalContentBlockLabel = document.createElement('p');
    this.modalContentBlockLabel = this.createDomNode(this.modalContentBlockLabel, 'p', 'contentBlockSummary');;
    let count = 0;
    if (mark === "Live") {
      this.modalContentBlockLabel.innerText = this.live;
      count = +this.live[1]
    }
    if (mark === "Create") {
      this.modalContentBlockLabel.innerText = this.create;
      count = +this.create[1]
    }
    if (mark === "Love") {
      this.modalContentBlockLabel.innerText = this.love;
      count = +this.love[1]
    }
    if (mark === "Dream") {
      this.modalContentBlockLabel.innerText = this.dream;
      count = +this.dream[1]
    }
    node.append(this.modalContentBlockLabel);

    for (let i = 0; i < 5; i++) {
      if (i < count) this.modalContentSpan = this.createDomNode(this.modalContentSpan, 'span', 'redSnowflake')
      else this.modalContentSpan = this.createDomNode(this.modalContentSpan, 'span', 'whiteSnowflake')
      node.append(this.modalContentSpan);
    }

    return node;
  };

  // setContent(content) { }
  appendModalElements() {
    this.overlay.append(this.modal);
    this.modal.append(this.modalImage);
    this.modal.append(this.modalContent);
    this.modalContent.append(this.modalContentCategory);
    this.modalContent.append(this.modalContentName);
    this.modalContent.append(this.modalContentDescription);
    this.modalContent.append(this.modalContentLabel);
    this.modalContent.append(this.modalContentBlockLive);
    this.modalContent.append(this.modalContentBlockCreate);
    this.modalContent.append(this.modalContentBlockLove);
    this.modalContent.append(this.modalContentBlockDream);

    // this.modalContent.append(this.name);
    this.modal.append(this.modalCloseBtn);
    this.modalCloseBtn.append(this.modalCloseLine);

  }

  openModal() {
    // console.log(this.overlay);
    document.body.append(this.overlay);
    document.body.classList.add('nonescroll');
  };

  closeModal(target) {
    // console.log(target.classList)
    if (target.classList == 'overlay' || target.classList == 'modal__close-btn' || target.classList == 'modal__close-line') {
      document.body.classList.remove('nonescroll');
      this.overlay.remove();
    }
  };
}