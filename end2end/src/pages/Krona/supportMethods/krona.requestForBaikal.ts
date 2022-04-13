import { kronaExpertRequestCard, requestsCreateFlat } from "../index";

import { IRequestFlat } from "options/testData/krona";

import { browserSwitchWindow } from "modules/supportMethodsForBrowserTabs";

import { EnumSwitchWindow } from "shared/enums/enum.switchWindow";

import {
  kronaLoginAndLoad,
  kronaNewRequestPriceForFlat,
  kronaLogoutFromCurrentAndLoginUnderAnother,
} from "pages/Krona/supportMethods";

export class KronaRequestForBaikal {
  private readonly login;
  private readonly password;
  private readonly expert_login;
  private readonly expert_password;
  private readonly request_flat_data;

  /**
   * @param login - Логин пользователя, под которым создается запрос стоимости
   * @param password - Пароль пользователя, под которым создается запрос стоимости
   * @param expert_login - Логин аналитика, под которым происходит верификация заявки
   * @param expert_password - Пароль аналитика, под которым происходит верификация заявки
   * @param request_flat_data - Данные для нового запроса стоимости
   * */
  constructor(
    login: string,
    password: string,
    expert_login: string,
    expert_password: string,
    request_flat_data?: IRequestFlat
  ) {
    this.login = login;
    this.password = password;
    this.expert_login = expert_login;
    this.expert_password = expert_password;
    this.request_flat_data = request_flat_data;
  }

  newRequest(): Array<string> {
    kronaLoginAndLoad(this.login, this.password);
    kronaNewRequestPriceForFlat(this.request_flat_data);

    let rfvId: string = "";
    rfvId = requestsCreateFlat.getRfvId();
    if (rfvId !== null && rfvId !== "") {
      kronaLogoutFromCurrentAndLoginUnderAnother(this.expert_login, this.expert_password);

      kronaExpertRequestCard.goToExpertRequestCard(rfvId);
      kronaExpertRequestCard.waitForLoad(false);
      kronaExpertRequestCard.setExecutorToCurrentUser();
      kronaExpertRequestCard.waitForLoad(false);
      kronaExpertRequestCard.goToBaikal();
      browserSwitchWindow(`baikal`, EnumSwitchWindow.switch_to_baikal);
      return [rfvId];
    } else throw new Error("Ошибка создания запроса на верификацию.");
  }
}
