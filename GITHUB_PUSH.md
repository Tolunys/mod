# Düzeltmeleri GitHub'a Yükleme Rehberi

Aşağıdaki adımlar, yereldeki bu projedeki düzeltmeleri GitHub'daki uzak depoya göndermenize yardımcı olur. Henüz bir uzak depo eklemediyseniz veya push yapmadıysanız, değişiklikler GitHub'da görünmez; önce remote ekleyip push işlemini tamamlamanız gerekir.

## 1) Hazırlık
- Bilgisayarınızda Git kurulmuş olmalı ve GitHub hesabınıza erişiminiz bulunmalı.
- GitHub'da boş veya mevcut bir uzak depo oluşturun ve HTTPS/SSH adresini not edin (örn. `https://github.com/kullanici/proje.git`).

## 2) Mevcut durumu kontrol etme
```bash
git status
```
Çalışma alanınızdaki değişiklikleri görün. İzlenmeyen dosyalar veya değiştirdiğiniz dosyalar burada listelenir.

## 3) Değişiklikleri sahneye alma ve commit atma
```bash
git add .
git commit -m "Düzeltmeleri uygula"
```
`git add .` tüm değişiklikleri sahneye alır; isterseniz tek tek dosya da ekleyebilirsiniz (örn. `git add app/components/DotAnimation.js`).

## 4) Uzak depoyu ekleme (ilk kez gerekiyorsa)
```bash
git remote add origin <uzak-depo-adresi>
```
`<uzak-depo-adresi>` yerine GitHub'daki depo URL'nizi yazın. Eğer `origin` zaten ekliyse bu adımı atlayın veya `git remote -v` ile kontrol edin.

## 5) Güncel olup olmadığınızı kontrol etme (önerilir)
```bash
git pull --rebase origin <ana-branch>
```
`<ana-branch>` çoğu projede `main` veya `master` olur. Çakışma çıkarsa çözüp `git rebase --continue` ile ilerleyin.

## 6) Değişiklikleri GitHub'a gönderme
```bash
git push origin <branch-adiniz>
```
`<branch-adiniz>` yerelde çalıştığınız branch adıdır (örn. `main`, `feature/temizlik`). Komut başarıyla biterse GitHub'da değişiklikleri görebilirsiniz.

## 7) Pull request açma (gerekiyorsa)
- Branch'ınızı GitHub'a ittikten sonra depo sayfasında “Compare & pull request” butonunu kullanın.
- Başlık ve açıklamayı doldurup değişiklikleri inceleyin, ardından PR'ı oluşturun.

İyi çalışmalar!

## 8) Tek komutla gönderim için script
`scripts/push_to_github.sh` dosyası değişiklikleri sahneleyip commit eder, remote/branch ile senkronize eder ve iter. Kullanım:
```bash
# Varsayılan remote=origin, branch=aktif branch, mesaj="Düzeltmeleri uygula"
./scripts/push_to_github.sh "Commit mesajınız"

# Farklı remote veya branch için ortam değişkeni ile
REMOTE=upstream BRANCH=main ./scripts/push_to_github.sh "Güncelle"

# Remote tanımlı değilse URL vererek otomatik eklemek için
REMOTE=origin REMOTE_URL=https://github.com/Tolunys/calm-dotapp.git ./scripts/push_to_github.sh "Düzeltmeleri uygula"

# Aynı işlemi ortam değişkensiz bayraklarla yapmak için
./scripts/push_to_github.sh --remote origin --remote-url https://github.com/Tolunys/calm-dotapp.git "Düzeltmeleri uygula"
```
Script hata durumunda durur; commit edilecek değişiklik yoksa bilgilendirici bir uyarı basar.
Remote adı tanımlı değilse çalışmayı keser; uzak branch henüz yoksa rebase adımını atlayarak ilk push için yol açar.
Sahnelenecek değişiklik yoksa uyarı verip çıkış yapar.

## 9) Gönderimin GitHub'da göründüğünü nasıl doğrularım?
- `git remote -v` komutuyla hangi URL'ye push yaptığınızı kontrol edin.
- Bu komut hiç çıktı vermiyorsa henüz bir remote eklenmemiş demektir ve GitHub'da hiçbir şey görünmez; önce 4. adımdaki gibi remotu ekleyip push edin.
- `git fetch --all` ile bilgileri tazeleyip ardından `git log --oneline --decorate --graph -5` çalıştırarak son commit'lerinizi görün.
- GitHub web arayüzünde ilgili branch'ı açıp commit mesajınızın listede yer aldığını doğrulayın.
