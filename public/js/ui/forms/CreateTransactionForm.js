/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const user = User.current();

    const callback = (error, response) => {
      if (error) {
        throw new Error('Ошибка!');
      } else {
        const selectBox = this.element.querySelector('.accounts-select');
        selectBox.textContent = '';
        let html = '';
        for (const account of response.data) {
          html += `
            <option value="${account.id}">${account.name}</option>
          `;
        }

        selectBox.insertAdjacentHTML('beforeend', html);
      }
    }

    Account.list(user, callback);   
  }

  

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  
   onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response) {
        this.element.reset();
        if (App.getModal('newIncome')) {
          App.getModal('newIncome').close();
        }
        if (App.getModal('newExpense')) {
          App.getModal('newExpense').close();
        }
          App.getWidget("accounts").update();
          App.getPage("transactions").update();
      }
    })

  }
}
