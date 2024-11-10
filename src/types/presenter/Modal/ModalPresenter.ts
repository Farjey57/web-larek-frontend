import { ModalView } from "../../../components/view/Modal/ModalView";

export interface IModalPresenter {
  modal: ModalView;
  addListeners(): void;
}