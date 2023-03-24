/*
  ==============================================================================
    (c) 2023. quantum universe All rights reserved.
    author : JOOYOUNG KIM
    start date : 2023. 3. 13.
  ==============================================================================
*/

export class GetUserDataOutput {
  private readonly id: number;
  private readonly profileImageUrl: string;
  private readonly password: string;
  private readonly email: string;
  private readonly nickname: string;
  private readonly name: string;
  private readonly gmt: string;
  private readonly creatorSwitch: boolean;
  private readonly isMeta: boolean;
  private readonly deletedAt: Date | null;

  get _id() {
    return this.id;
  }

  get _password() {
    return this.password;
  }

  get _isMeta() {
    return this.isMeta;
  }

  get _email() {
    return this.email;
  }

  get _deletedAt() {
    return this.deletedAt;
  }

  get _creatorSwitch() {
    return this.creatorSwitch;
  }
}
