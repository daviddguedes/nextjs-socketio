import {
  Button,
  Classes,
  Dialog,
  Intent,
  TextArea,
} from "@blueprintjs/core";

const ModalComponent = ({ handleClose, modalState, handleChange, value, handleButtonAction }) => {
  return (
    <Dialog
      icon="plus"
      onClose={handleClose}
      title="Nova Nota"
      {...modalState}
    >
      <div className={Classes.DIALOG_BODY}>
        <TextArea
          className={[Classes.INPUT, Classes.TEXT_LARGE, Classes.FILL]}
          growVertically={false}
          large={true}
          intent={Intent.PRIMARY}
          maxLength="150"
          onChange={handleChange}
          value={value}
        />
        <Button onClick={() => handleButtonAction(value)} icon="plus" text="Salvar" />
      </div>
    </Dialog>
  )
}

export default ModalComponent;